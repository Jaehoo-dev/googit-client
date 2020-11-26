import uuid from 'uuid-random';

export default function applyIdsLookingAhead(blocks) {
  const newBlocks = JSON.parse(JSON.stringify(blocks));

  newBlocks.forEach(block => {
    block.idLookingAhead = uuid();
  });

  return newBlocks;
}
