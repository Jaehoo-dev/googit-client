export default function compareNoteChanges(previousNote, currentNote) {
  const previousBlocks = previousNote.blocks;
  const currentBlocks = currentNote.blocks;

  console.log(previousBlocks);
  console.log(currentBlocks);

  const previousIdsTable = {};
  const currentIdsTable = {};

  previousBlocks.forEach(block => {
    const id = block.idLookingAhead;

    if (!previousIdsTable.hasOwnProperty(id)) {
      previousIdsTable[id] = 0;
    }

    previousIdsTable[id] += 1;
  });

  currentBlocks.forEach(block => {
    const id = block.idLookingBack;

    if (!currentIdsTable.hasOwnProperty(id)) {
      currentIdsTable[id] = 0;
    }

    currentBlocks[id] += 1;
  });

  console.log(previousIdsTable);
  console.log(currentIdsTable);
}

