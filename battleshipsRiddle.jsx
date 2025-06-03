import React, { useState, useEffect } from 'react';

const BattleshipsRiddle = () => {
  const [grid, setGrid] = useState(() => Array(13).fill().map(() => Array(13).fill('')));
  const [isSetupMode, setIsSetupMode] = useState(true);
  const [neededParts, setNeededParts] = useState(Array(11).fill(''));
  const [neededPartsCol, setNeededPartsCol] = useState(Array(11).fill(''));

  // Calculate parts left (12th row/col)
  const calculatePartsLeft = () => {
    const partsLeft = Array(11).fill(0);
    const partsLeftCol = Array(11).fill(0);

    for (let i = 0; i < 10; i++) {
      const needed = parseInt(neededParts[i]) || 0;
      const neededCol = parseInt(neededPartsCol[i]) || 0;
      
      let hinted = 0;
      let hintedCol = 0;
      let entered = 0;
      let enteredCol = 0;

      for (let j = 0; j < 10; j++) {
        // Count hinted parts in row i
        const cellValue = grid[i][j];
        if (cellValue && cellValue !== 'X' && !isNumeric(cellValue)) {
          if (cellValue === '1' || shouldPaintGreen(i, j)) {
            hinted++;
          }
        } else if (isNumeric(cellValue)) {
          entered++;
        }

        // Count hinted parts in column i
        const cellValueCol = grid[j][i];
        if (cellValueCol && cellValueCol !== 'X' && !isNumeric(cellValueCol)) {
          if (cellValueCol === '1' || shouldPaintGreen(j, i)) {
            hintedCol++;
          }
        } else if (isNumeric(cellValueCol)) {
          enteredCol++;
        }
      }

      partsLeft[i] = needed - hinted - entered;
      partsLeftCol[i] = neededCol - hintedCol - enteredCol;
    }

    return { partsLeft, partsLeftCol };
  };

  // Calculate vacant spaces (13th row/col)
  const calculateVacantSpaces = () => {
    const vacant = Array(11).fill(0);
    const vacantCol = Array(11).fill(0);

    for (let i = 0; i < 10; i++) {
      let occupiedRow = 0;
      let occupiedCol = 0;

      for (let j = 0; j < 10; j++) {
        // Count occupied spaces in row i
        if (grid[i][j] && grid[i][j] !== '') {
          occupiedRow++;
        }

        // Count occupied spaces in column i
        if (grid[j][i] && grid[j][i] !== '') {
          occupiedCol++;
        }
      }

      vacant[i] = 10 - occupiedRow;
      vacantCol[i] = 10 - occupiedCol;
    }

    return { vacant, vacantCol };
  };

  const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value)) && value !== '';
  };

  const shouldPaintGreen = (row, col) => {
    const value = grid[row][col];
    if (value === '1') return true;
    if (!isNumeric(value)) return false;

    const num = parseInt(value);
    if (num < 2 || num > 4) return false;

    // Check for adjacent cells with same number
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let adjacentCount = 1; // Include current cell

    for (const [dr, dc] of directions) {
      let r = row + dr;
      let c = col + dc;
      
      while (r >= 0 && r < 10 && c >= 0 && c < 10 && grid[r][c] === value) {
        adjacentCount++;
        r += dr;
        c += dc;
      }
    }

    return adjacentCount >= num;
  };

  const getCellStyle = (row, col) => {
    const value = grid[row][col];
    let style = {
      width: '40px',
      height: '40px',
      border: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px'
    };

    // Color cells based on content
    if (value === 'X' || value === 'S') {
      style.backgroundColor = '#87CEEB';
      style.color = 'white';
    } else if (value === '1' || shouldPaintGreen(row, col)) {
      style.backgroundColor = '#90EE90';
    }

    // Handle needed parts row/col (row 10, col 10)
    if (row === 10 && col < 10) {
      style.backgroundColor = '#f0f0f0';
    }
    if (col === 10 && row < 10) {
      style.backgroundColor = '#f0f0f0';
    }

    // Handle calculated rows/cols (11, 12)
    if (row >= 11 || col >= 11) {
      style.backgroundColor = '#e0e0e0';
    }

    // Thick borders for rows/cols with only 1 part left
    const { partsLeft, partsLeftCol } = calculatePartsLeft();
    if (!isSetupMode) {
      if (row < 10 && partsLeft[row] === 1) {
        style.borderTop = '3px solid #000';
        style.borderBottom = '3px solid #000';
      }
      if (col < 10 && partsLeftCol[col] === 1) {
        style.borderLeft = '3px solid #000';
        style.borderRight = '3px solid #000';
      }
    }

    return style;
  };

  const handleCellChange = (row, col, value) => {
    const newGrid = [...grid.map(row => [...row])];
    
    if (row === 10 && col < 10) {
      // Updating needed parts row
      const newNeeded = [...neededParts];
      newNeeded[col] = value;
      setNeededParts(newNeeded);
      
      // If 0, mark entire column as X
      if (value === '0') {
        for (let i = 0; i < 10; i++) {
          newGrid[i][col] = 'X';
        }
        setGrid(newGrid);
      }
    } else if (col === 10 && row < 10) {
      // Updating needed parts column
      const newNeeded = [...neededPartsCol];
      newNeeded[row] = value;
      setNeededPartsCol(newNeeded);
      
      // If 0, mark entire row as X
      if (value === '0') {
        for (let j = 0; j < 10; j++) {
          newGrid[row][j] = 'X';
        }
        setGrid(newGrid);
      }
    } else if (row < 12 && col < 12) {
      // Updating any cell in the editable area (including row/col 11 in setup mode)
      newGrid[row][col] = value.toUpperCase();
      setGrid(newGrid);
    }
  };

  const isCellDisabled = (row, col) => {
    if (row >= 12 || col >= 12) return true; // Only rows/cols 12+ are always disabled
    
    if (isSetupMode) {
      return false; // All editable cells enabled in setup mode (rows 0-11, cols 0-11)
    } else {
      // In play mode, disable cells that have hints (non-empty and non-numeric)
      if (row === 10 || col === 10 || row === 11 || col === 11) return true; // Setup cells disabled in play mode
      
      const cellValue = grid[row][col];
      // Disable if cell has a hint (non-empty and not a number)
      return cellValue !== '' && !isNumeric(cellValue);
    }
  };

  const toggleMode = () => {
    setIsSetupMode(!isSetupMode);
  };

  const renderCell = (row, col) => {
    let content = '';
    let isEditable = false;
    
    if (row < 10 && col < 10) {
      content = grid[row][col];
      isEditable = true;
    } else if (row === 10 && col < 10) {
      content = neededParts[col];
      isEditable = true;
    } else if (col === 10 && row < 10) {
      content = neededPartsCol[row];
      isEditable = true;
    } else if (row === 11 && col < 10) {
      if (isSetupMode) {
        content = grid[row][col];
        isEditable = true;
      } else {
        const { partsLeft } = calculatePartsLeft();
        content = partsLeft[col];
      }
    } else if (col === 11 && row < 10) {
      if (isSetupMode) {
        content = grid[row][col];
        isEditable = true;
      } else {
        const { partsLeftCol } = calculatePartsLeft();
        content = partsLeftCol[row];
      }
    } else if (row === 12 && col < 10) {
      const { vacant } = calculateVacantSpaces();
      content = vacant[col];
    } else if (col === 12 && row < 10) {
      const { vacantCol } = calculateVacantSpaces();
      content = vacantCol[row];
    } else if (row === 10 && col === 10) {
      content = 'Need';
    } else if (row === 11 && col === 10) {
      content = 'Left';
    } else if (row === 12 && col === 10) {
      content = 'Vacant';
    } else if (row === 10 && col === 11) {
      content = 'Need';
    } else if (row === 10 && col === 12) {
      content = 'Need';
    } else if (row === 11 && col === 11) {
      content = 'Left';
    } else if (row === 11 && col === 12) {
      content = 'Left';
    } else if (row === 12 && col === 11) {
      content = 'Vacant';
    } else if (row === 12 && col === 12) {
      content = 'Vacant';
    }

    const cellStyle = getCellStyle(row, col);
    const disabled = isCellDisabled(row, col);

    if (isEditable) {
      return (
        <input
          key={`${row}-${col}`}
          type="text"
          value={content}
          onChange={(e) => handleCellChange(row, col, e.target.value)}
          disabled={disabled}
          style={{
            ...cellStyle,
            border: cellStyle.border,
            backgroundColor: disabled ? '#f5f5f5' : cellStyle.backgroundColor,
            color: disabled ? '#666' : cellStyle.color,
            textAlign: 'center',
            padding: '0',
            margin: '0',
            outline: 'none'
          }}
          maxLength="1"
        />
      );
    } else {
      return (
        <div
          key={`${row}-${col}`}
          style={cellStyle}
        >
          {content}
        </div>
      );
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Battleships Riddle</h1>
        
        <div className="text-center mb-4">
          <button
            onClick={toggleMode}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold"
          >
            {isSetupMode ? 'NEW' : 'DONE'}
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Mode: {isSetupMode ? 'Setup (Click NEW when ready to play)' : 'Play (Click DONE to return to setup)'}
          </p>
        </div>

        <div className="w-fit mx-auto border-2 border-gray-800">
          {Array(13).fill().map((_, row) => (
            <div key={row} className="flex">
              {Array(13).fill().map((_, col) => renderCell(row, col))}
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-700 max-w-2xl mx-auto">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <div className="space-y-1">
            <p><strong>Setup Mode:</strong> Click cells to set hints and needed parts</p>
            <p><strong>Hints:</strong> U=Up, D=Down, L=Left, R=Right, M=Middle, S/X=Sea (blue)</p>
            <p><strong>Numbers:</strong> 1=Single ship part (green), 2-4=Adjacent parts needed</p>
            <p><strong>Play Mode:</strong> Enter numbers 1-4 or X to solve the puzzle</p>
            <p><strong>Borders:</strong> Thick borders appear when only 1 part is left in row/column</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleshipsRiddle;
