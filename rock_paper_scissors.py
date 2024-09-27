import random

print("================================")
print("Rock Paper Scissors Lizard Spock")
print("================================")
print("1) ✊")
print("2) ✋")
print("3) ✌️")
print("4) 🦎")
print("5) 🖖")

playAgain = True
while playAgain:
    try:
        player = int(input("Pick a number: "))
        if player not in [1, 2, 3, 4, 5]:
            raise ValueError("You\'ve made an Invalid choice")
    except ValueError as e:
        print(f"Error: {e}. Please select a valid number between 1 and 5.")
        continue

    computer = random.randint(1, 5)
    choices = {1: "✊", 2: "✋", 3: "✌", 4: "🦎", 5: "🖖"}
    print(f"\nYou chose: {choices[player]}")
    print(f"CPU chose: {choices[computer]}")

    if player == computer:
        print("It's a tie!")
    elif (player == 1 and computer in [3, 4]) or \
         (player == 2 and computer in [1, 5]) or \
         (player == 3 and computer in [2, 4]) or \
         (player == 4 and computer in [2, 5]) or \
         (player == 5 and computer in [1, 3]):
        print("You\'ve won!")
    else:
        print("The computer won!")

    playAgain = input("Do you want to play again? (y/n): ").lower() == "y"



