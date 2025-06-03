# battleships
the battleships riddle game

Instructions to Canva: 

simulate an app called battleships with a 13x113 grid each square can hold a single digit.

Five  buttons over the grid: New, Reset, Undo, Redo, Calc

New opens three empty textboxes and a DONE button.     
One textbox is for horizontal needed ship parts. One textbox is for vertical needed ship parts. One for hints. 
. 
I enter two sequences of ten digits in the  textboxes.     
The first textbox is for the horizontal digits, which set the row 11 cells. The other textbox, with ten digits, is for the vertical digits needed for the ship parts, setting the column 11 cells.         
These row and col 11  cells' digits are large and in bold. 
 
A third textbox allows the user to enter comma and space separated hints. Row.Col.Type: (eg. 4.5.M, 7.1.S) 
- M for middle ship part (square)
- L for ship end left 
- R for ship end right, 
- U for up, 
- D for down, 
- T for torpedo (circle)
- S for Sea.     
Hovering over the third textbox caption: "Hints"  shows the explanation Row.Col.Type. M - middle...  etc. 

When the DONE is pressed The values of the hints are entered in the 10 by 10 grid, the values of the needed parts are entered in the 11th row and col, and the textboxes and DONE button are hidden and collapsed away. The next NEW press will clear the grids and textboxes.

This is a game with 1 four part aircraft carrier, 2 three part battleships, 3 two part destroyers, and 4 single part torpedo boats (depicted by a circle).  The boats are in the 10 by 10. grid. No boats can be adjacent to each other. Horizontally, vertically or diagonally. 

The game starts with a few hints (usually up to 3 hints) with an long-boat end part going in one direction, a long-=boat middle part as a square, or a single part torpedo boat, as a circle, or a "sea". space which shows waves. The hinted parts shape will be filled with Black The shape will be in the background and the user may fill it with a number.  (or an x, in the case of a Sea hint)

An X entered by the user marks no boat (sea) and is painted dark blue. Any digit entered marks a boat part.

On the 11th col and 11th row you have the number of parts given for this game. 

On the 12th col and row, you have the number of parts left to achieve the goal of that row or col. (number of parts listed in row or col 11 minus the number of parts hinted, and the number of parts entered )

On the 13th row and col you have the number of places not yet marked with X. 

Once a boat part was put in, all squares diagonally are marked X. If the boat part is adjacent to another part  then the two open sides are marked with an x as well. 

A line with Zero parts has zero parts left, and thus is all marked with X. (and dark blue)
A boat with digits in the number of parts depicted by that digit (that is 4444, 333  22 or 1)  horizontally or vertically will be painted Green. 

A row or col with a single part left will have the borders between its cells with a Thick black line as opposed to the regular grid lines. 

First describe thesee requirements in detail and in better wording. 

Then I will ask you to actually simulate this code. 
