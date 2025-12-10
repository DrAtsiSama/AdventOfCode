import re
import numpy as np
from scipy import optimize


def parse_machine(line: str) -> tuple[np.ndarray, np.ndarray]:
    """
    Parse la ligne sous forme matricielle :
    mask: matrice (nb_counters x nb_buttons)
    joltages: vector target
    """
    # Extract target values {a,b,c,d}
    joltages = np.array([
        int(n)
        for n in re.findall(r"\{([0-9,]+)\}", line)[0].split(",")
    ])

    buttons = re.findall(r"\(([^)]*)\)", line)

    mask = np.zeros((len(joltages), len(buttons)), dtype=int)

    for j, button in enumerate(buttons):
        for idx in button.split(","):
            mask[int(idx), j] = 1

    return mask, joltages


def optimize_pushes(mask: np.ndarray, joltages: np.ndarray) -> int:
    """
    Résout :
        min sum(x_i)
        s.t  M*x = target
             x >= 0 integers
    """
    result = optimize.linprog(
        c=np.ones(mask.shape[1]),  # minimize sum presses
        A_eq=mask,
        b_eq=joltages,
        bounds=(0, None),
        integrality=1
    )

    return int(result.x.sum())


def solve(input_file="input.txt"):
    total = 0
    with open(input_file) as f:
        for line in f:
            mask, joltages = parse_machine(line.strip())
            total += optimize_pushes(mask, joltages)
    return total


if __name__ == "__main__":
    print("PARTIE 2 =", solve())
