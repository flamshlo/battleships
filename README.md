# battleships
the battleships riddle game

Instructions from Claude

Here's a comprehensive description of the current Battleships Riddle Game app:

Grid Structure (13×13)
The app displays a 13×13 grid with different functional areas:

Main Play Area (Rows 0-9, Cols 0-9): 10×10 Grid
Primary puzzle area where ships are placed and hints are given
Each cell contains a single-character textbox
Supports hints: U (up), D (down), L (left), R (right), M (middle), S/X (sea)
Supports numbers: 1-4 for ship parts
Needed Parts (Row 10, Col 10)
Row 10 (cols 0-9): Shows how many ship parts are needed in each column
Col 10 (rows 0-9): Shows how many ship parts are needed in each row
Editable textboxes that accept numbers
Special behavior: Entering "0" automatically fills entire row/column with "X" (sea)
Parts Left (Row 11, Col 11)
Row 11 (cols 0-9): Auto-calculated remaining parts needed per column
Col 11 (rows 0-9): Auto-calculated remaining parts needed per row
Formula: Needed Parts - Hinted Parts - Entered Parts
Read-only display cells
Vacant Spaces (Row 12, Col 12)
Row 12 (cols 0-9): Shows remaining empty spaces per column
Col 12 (rows 0-9): Shows remaining empty spaces per row
Formula: 10 - Total Occupied Cells (hints + entries)
Read-only display cells
Label Cells
Corner cells (10,10), (11,11), (12,12) display "Need", "Left", "Vacant"
Cross-reference cells show corresponding labels
Game Modes
NEW Mode (Setup Phase)
Button displays "NEW"
All textboxes enabled in the 11×11 editable area (rows 0-10, cols 0-10)
Players can:
Set hints in main 10×10 grid (U/D/L/R/M/S/X/1-4)
Define needed ship parts in row 10 and column 10
Prepare the puzzle for solving
DONE Mode (Play Phase)
Button displays "DONE"
Selective textbox disabling:
Row 10 & Column 10 (needed parts) become disabled
Any cell with hints (non-numeric content) becomes disabled
Only empty cells and cells with numbers remain editable
Players can only enter numbers 1-4 or X in available cells
Visual Features
Color Coding
Blue cells: Sea markers (X or S hints)
Green cells: Ship parts (digit 1, or correct adjacent groupings of 2-4)
Gray cells: Calculated areas (rows/cols 11+)
Light gray cells: Needed parts area (row 10, col 10)
Disabled cells: Darker gray background
Smart Highlighting
Adjacent grouping logic:
Single "1" = green
Two adjacent "2"s = both green
Three adjacent "3"s = all green
Four adjacent "4"s = all green
Thick borders: Appear around entire rows/columns when only 1 part remains
Game Logic
Automatic Calculations
Parts Left Calculation:
Counts hinted ship parts (green cells)
Counts entered numbers (player input)
Subtracts both from needed parts
Updates in real-time
Vacant Space Calculation:
Counts all occupied cells (any non-empty cell)
Subtracts from 10 to show remaining spaces
Helps players manage space constraints
Input Validation
Single character limit per textbox
Automatic uppercase conversion
Real-time grid state updates
Special Behaviors
Zero handling: Entering "0" in needed parts automatically marks entire row/column as sea (X)
Mode switching: Seamless transition between setup and play modes
State preservation: All entries maintained when switching modes
User Interface
Controls
NEW/DONE button: Toggles between setup and play modes
Mode indicator: Shows current mode and instructions
Direct input: Click and type in any enabled textbox
Responsive Design
Fixed 40×40 pixel cells for consistent grid appearance
Centered layout with clear visual boundaries
A comprehensive instructions panel below the grid
This creates a sophisticated puzzle game that combines logical deduction with spatial reasoning, where players must use numerical constraints and directional hints to locate hidden ships on the grid.

NEW Mode (Setup):

All textboxes enabled in rows 0-11 and columns 0-11
You can edit the main 10×10 grid (hints)
You can edit row 10 and column 10 (needed parts)
You can now also edit row 11 and column 11 (custom setup values)

DONE Mode (Play):

Row 10, column 10, row 11, and column 11 all become disabled
Row 11 and column 11 switch from showing your custom setup values to showing auto-calculated "parts left"
Only the main 10×10 grid remains editable (and only cells without hints)

This gives you full control in setup mode to prepare both the puzzle constraints (needed parts) and any custom values for row/column 11, then switches to calculated mode during play where those become the automatic "parts left" counters.RetryClaude can make mistakes. Please double-check responses. Sonnet 4







