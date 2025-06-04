# Battleships Riddle Game

A sophisticated 13×13 grid-based puzzle game that combines logical deduction with spatial reasoning to locate hidden ships using numerical constraints and directional hints.

## 🎮 Game Overview

Players solve battleship puzzles by placing ship parts on a grid using:
- **Numerical constraints** (how many parts needed per row/column)
- **Directional hints** (U/D/L/R/M for hinted ship orientations, and S for hinted sea)
- **Adjacent grouping logic** (consecutive numbered parts)
- **Real-time calculations** (parts remaining, vacant spaces)

## 🏗️ Grid Structure (13×13)

### Main Game Areas

| Area | Location | Description | Editable |
|------|----------|-------------|----------|
| **Heading** | Row 0, Col 0 | digits with row and col number | 📋 Display only |
| **Game Area** | Row 1 col 1 to row 10 col 10 | 10×10 main puzzle area | ✅ Context-dependent |
| **Needed Parts** | Row 11, Col 11 | Ship parts required per row/column for current game | ✅ Setup only |
| **Parts Left** | Row 12, Col 12 | Auto-calculated remaining parts | ✅ Setup / 📊 Auto in Play |
| **Vacant Spaces** | Row 13, Col 13 | Empty cells remaining (not ship parts and not | 📊 Auto-calculated |
| **Labels** | Corners | "Need", "Left", "Vacant" headers | 📋 Display only |

## 🔄 Game Modes

### 🔧 NEW Mode (Setup Phase)
Button: [NEW] → Click to enter setup
Status: All textboxes ENABLED in 11×11 game area (row 1 col 1 to row 10 col 10) and in goal area (all of row 11, and all of col 11)
Button [NEW] now reads DONE. 

**Capabilities:**
- ✏️ Set hints in Game Area (main 10×10 grid, starting at 1,1)
- 🔢 Define row and column count of needed ship parts (row/col 11)

**Calculations upon Setup completion**
Button: [DONE] brings back the NEW text on the button.
Any cells with hints are now uneditable. 
Row and Col 11 with Needed Parsl

- 🎛️ Set custom values in row/col 12
- ⚙️ Prepare puzzle constraints

**Special Behaviors:**
- Entering `0` in needed parts → entire row/column marked as sea (`X`)

### 🎯 DONE Mode (Play Phase)
Button: [DONE] → Click to end setup mode and start playing
Status: Selective textbox disabling

**Enabled:**
- 🎮 Empty cells in main 10×10 grid
- 🔢 Cells with numbers (1-4)

**Disabled:**
- 🚫 Row 10 & Column 10 (needed parts)
- 🚫 Row 11 & Column 11 (now shows auto-calculated "parts left")
- 🚫 Cells with hints (U/D/L/R/M/S/X)

## 🎨 Visual System

### Color Coding
| Element | Color | Meaning |
|---------|-------|---------|
| 🔵 **Blue cells** | `#87CEEB` | Sea markers (X, S) |
| 🟢 **Green cells** | `#90EE90` | Valid ship parts |
| ⬜ **Light gray** | `#f0f0f0` | Needed parts area |
| ⬛ **Dark gray** | `#e0e0e0` | Calculated areas |
| 🚫 **Disabled** | `#f5f5f5` | Non-editable cells |

### Smart Highlighting
- **Single parts**: `1` → Green
- **Adjacent groups**: 
  - Two adjacent `2`s → Both green
  - Three adjacent `3`s → All green  
  - Four adjacent `4`s → All green
- **Thick borders**: Entire rows/columns with only 1 part remaining

## 🧮 Game Logic

### Auto-Calculations

#### Parts Left Formula
Parts Left = Needed Parts - Hinted Parts - Entered Parts
- Updates in real-time as player makes moves
- Excludes sea markers (X) from counts

#### Vacant Spaces Formula
Vacant Spaces = 10 - Total Occupied Cells
- Counts ALL non-empty cells (hints + entries + sea)
- Helps manage space constraints

### Input Validation
- ✅ Single character limit per cell
- ✅ Automatic uppercase conversion
- ✅ Real-time state updates
- ✅ Mode-specific editing restrictions

## 🎯 Supported Inputs

### Hints (Setup Mode)
| Input | Meaning | Visual |
|-------|---------|--------|
| `U` | Ship part points up | Text |
| `D` | Ship part points down | Text |
| `L` | Ship part points left | Text |
| `R` | Ship part points right | Text |
| `M` | Ship part is middle section | Text |
| `S` / `X` | Sea (no ship) | Blue background |
| `1` | Single ship part | Green background |

### Numbers (Play Mode)
| Input | Meaning | Behavior |
|-------|---------|----------|
| `1-4` | Ship part | Counts toward totals |
| `X` | Sea marker | Blue, doesn't count as ship |

## 🏆 Winning Condition

Puzzle is solved when:
- ✅ All ship parts placed according to hints
- ✅ Row/column totals match requirements  
- ✅ Adjacent number groups form valid ships
- ✅ No conflicts with directional hints

## 🔧 Technical Features

- **React Hooks**: useState for state management
- **Real-time Updates**: Immediate visual feedback
- **Responsive Design**: Fixed 40×40px cells
- **Memory Storage**: All data stored in component state
- **Mode Persistence**: Settings maintained across mode switches

## 🎮 How to Play

1. **Setup**: Click `NEW` → Enter hints and constraints
2. **Configure**: Set needed parts in row/col 10
3. **Start**: Click `DONE` to begin solving
4. **Solve**: Fill main grid following constraints
5. **Visual Cues**: Use colors and borders for guidance
6. **Complete**: Satisfy all numerical requirements

---

*A challenging logic puzzle that tests spatial reasoning and deductive skills!*RetryClaude does not have the ability to run the code it generates yet.Claude can make mistakes. Please double-check responses. Sonnet 4
