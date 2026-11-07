# BluePixel Studio for Windows

A blue-themed, offline desktop editor for embedded display graphics, built as an Electron project for VS Code.

## Run in VS Code

1. Extract the source ZIP and open the BluePixelStudio-Windows folder in VS Code.
2. Open Terminal → New Terminal and run: npm install, then npm run dev.
3. Use Terminal → Run Task → Run BluePixel Studio to launch from VS Code.
4. Build the Windows installer with npm run dist, or choose Terminal → Run Task → Build Windows installer. The installer is written in the release folder.

The first install downloads Electron and Windows packaging tools. The app itself runs offline.

## Features

- Project setup with a searchable 14-option platform list covering Lopaka’s 13 supported backends plus Custom C++; OLED/TFT presets, custom dimensions, and background color
- Drag-resizable design and inspector panels, canvas zoom grip, and docked console resize grip; centered canvas with a View dropdown for All panels, Design panel, Inspector panel, or Canvas focus; independently scrollable side drawers; vertical canvas controls for zoom, fit-to-view, actual pixel size, grid, and panel visibility; multiple screens, toggleable crisp, one-screen-pixel white grid lines every 10 × 10 canvas pixels, pixel-snapped zoom-aware crosshair, coordinate and scale readout, and live preview
- Scalable canvas text with font size controls and a drag handle; Rectangle, ellipse, line, freehand brush, triangle, polygon, arc, and image tools; polygon and triangle vertices are placed by clicking and edited on double-click
- Docked, resizable generated-code console with live preview, source-file import, copy, and adjacent export controls; keyboard shortcut guide: multi-select, copy/paste/cut, grouping, layer ordering, 1 px or 10 px nudges, zoom, undo/redo, and right-click eraser
- Offline Lopaka image packs: all 523 bundled Gaai and Flipper Zero pixel images, searchable by pack/name, with a fit-to-canvas size selector; existing blue/cyan pixel-symbol gallery remains available
- 42 ready-made looping sprite animations across UI, loaders, web, social, media, weather, ecommerce, emoji, gestures, food, sports, gadgets, and health categories; toolbar shortcut, search, size/quality controls, and animated canvas preview
- Image library, editable/duplicable/reorderable layers, local motion-path animation, undo/redo, and autosave
- Configurable Arduino or ESP-IDF C++ export profiles for TFT_eSPI or Adafruit_GFX, optional PROGMEM image arrays, image pixel embedding, motion-path helpers, and first-frame sprite export; PNG, XBM, and project JSON export

The desktop shell blocks network requests and external navigation. Projects stay in this Windows user's local app storage. Project JSON is the portable backup format. Gallery publishing, accounts, and checkout are not part of this offline app.









