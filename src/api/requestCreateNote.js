import {
  USERS,
  BRANCHES,
  NOTES,
  NEW,
} from '../constants/urls';
import { POST } from '../constants/httpMethods';
import applyIdsLookingAhead from '../utils/applyIdsLookingBackwardsBeforeSave';
import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';

export default async function requestCreateNote(
  blocks,
  currentUser,
  branchId,
) {
  const blocksWithNewIds = applyIdsLookingAhead(blocks);

  let noteCreateResponse = await fetch(
    `${process.env.REACT_APP_SERVER_URL}${USERS}/${currentUser._id}${BRANCHES}/${branchId}${NOTES}${NEW}`,
    {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(GOOGIT_LOGIN_TOKEN)}`,
      },
      body: JSON.stringify(blocksWithNewIds)
    }
  );

  noteCreateResponse = await noteCreateResponse.json();

  if (noteCreateResponse.result === 'failure') {
    alert('쪽지를 만들다가 문제가 생겼어요');

    // delete branch

    return;
  }

  return noteCreateResponse;
}
