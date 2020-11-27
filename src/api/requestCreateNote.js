import {
  PORT,
  USERS,
  BRANCHES,
  NOTES,
  NEW,
} from '../constants/urls';
import { POST } from '../constants/httpMethods';
import applyIdsLookingAhead from '../utils/applyIdsLookingBackwardsBeforeSave';

export default async function requestCreateNote(
  blocks,
  currentUser,
  branchId,
) {
  const blocksWithNewIds = applyIdsLookingAhead(blocks);
  const noteCreateRes = await fetch(
    `${process.env.REACT_APP_SERVER_URL}${PORT}${USERS}/${currentUser._id}${BRANCHES}/${branchId}${NOTES}${NEW}`,
    {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
      },
      body: JSON.stringify(blocksWithNewIds)
    }
  );

  const noteCreateResponse = await noteCreateRes.json();

  if (noteCreateResponse.result === 'failure') {
    alert('쪽지를 만들다가 문제가 생겼어요');

    // delete branch

    return;
  }

  return noteCreateResponse;
}
