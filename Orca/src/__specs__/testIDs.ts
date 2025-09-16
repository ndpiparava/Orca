export const TEST_IDS = {
  CELL_ID: (rowIndex: number, columnIndex: number) =>
    `cell-${rowIndex}-${columnIndex}`,
  CELL_IMAGE_ID: (rowIndex: number, columnIndex: number) =>
    `cell-image-${rowIndex}-${columnIndex}`,
  GRID_ROW_ID: (rowIndex: number) => `grid-row-${rowIndex}`,
  GAME_BOARD_ID: 'game-board',
  GAME_SCREEN_ID: 'game-screen',
  GAME_LEVEL_SELECTOR_ID: 'game-level-selector',
};
