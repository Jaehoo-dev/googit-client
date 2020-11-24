import React from 'react';
import { BranchListHeadWrapper } from '../styledComponents';

export default function BranchListHead() {
  return (
    <BranchListHeadWrapper>
      <section>
        <div>#</div>
        <div>제목</div>
        <div>최종 수정자</div>
        <div>날짜</div>
        <div>공유</div>
      </section>
    </BranchListHeadWrapper>
  );
}
