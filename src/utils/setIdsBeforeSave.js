import uuid from 'uuid-random';

export default function setIdsBeforeSave(blocks) {
  const newBlocks = JSON.parse(JSON.stringify(blocks));

  newBlocks.forEach((block, index) => {
    block.idLookingBackwards = block.idLookingForwards;
    block.idLookingForwards = uuid();
    block.index = index;
  });

  return newBlocks;
}
