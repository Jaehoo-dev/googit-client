import mergeSort from './mergeSort';

export default function compareNoteChanges(previousNote, currentNote) {
  const previousBlocks = JSON.parse(JSON.stringify(previousNote)).blocks;
  const currentBlocks = JSON.parse(JSON.stringify(currentNote)).blocks;

  const previousBlocksTable = convertArrayToTable(previousBlocks, 'forwards');
  const currentBlocksTable = convertArrayToTable(currentBlocks, 'backwards');

  const erasedBlocks = [];
  const modifiedBlocksBefore = [];
  const unModifiedBlocks = [];
  const modifiedBlocksAfter = [];
  const newBlocks = [];

  previousBlocks.forEach(block => {
    if (!currentBlocksTable.hasOwnProperty(block.idLookingForwards)) {
      erasedBlocks.push(block);
    } else if (
      JSON.stringify(currentBlocksTable[block.idLookingForwards][0].block.children)
      === JSON.stringify(block.children)
    ) {
      unModifiedBlocks.push(block);
    } else {
      modifiedBlocksBefore.push(block);
    }
  });

  currentBlocks.forEach(block => {
    if (!previousBlocksTable.hasOwnProperty(block.idLookingBackwards)) {
      newBlocks.push(block);
    } else if (
      JSON.stringify(previousBlocksTable[block.idLookingBackwards][0].block.children)
      !== JSON.stringify(block.children)
    ) {
      modifiedBlocksAfter.push(block);
    }
  });

  markBlocks(erasedBlocks, 'before');
  markBlocks(modifiedBlocksBefore, 'before');
  markBlocks(modifiedBlocksAfter, 'after');
  markBlocks(newBlocks, 'after');

  const blocksArrays = [
    erasedBlocks,
    modifiedBlocksBefore,
    unModifiedBlocks,
    modifiedBlocksAfter,
    newBlocks
  ];

  return blocksArrays.reduce((accumulator, currentArray) => {
    return mergeSort(accumulator, currentArray);
  });
}

function convertArrayToTable(array, idSelection) {
  const resultTable = {};

  array.forEach((block, index) => {
    const id
      = idSelection === 'forwards'
        ? block.idLookingForwards
        : block.idLookingBackwards;

    if (!resultTable.hasOwnProperty(id)) {
      resultTable[id] = [];
    }

    resultTable[id].push({
      index,
      block,
    });
  });

  return resultTable;
}

function markBlocks(blocks, attribute) {
  blocks.forEach(block => {
    block.children.forEach(child => {
      child[attribute] = true;
    });
  });
}
