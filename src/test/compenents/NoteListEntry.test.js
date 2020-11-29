import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { mount } from 'enzyme';
import NoteListEntry from '../../components/NoteListEntry';

describe('<NoteListEntryList>', () => {
  let wrapper;

  beforeEach(() => {
    const mockedEntryListInfos = {
      branch: {
        latest_note: '5fc1b7a625b1860d9146956a',
        sharing_infos: [],
        updated_at: '2020-11-28T02:36:23.039Z',
      },
      latestNote: {
        blocks: [
          {
            type: 'paragraph',
            children: [
              { text: 'mock1' }
            ],
          }
        ]
      }
    };

    const creator = 'Test Author1';
    const count = 3;
    const mockedCallback = jest.fn(() => { return 'clicked'; });

    wrapper = mount(
      <Router>
        <NoteListEntry
          onNoteListEntryClick={mockedCallback}
          entryInfos={mockedEntryListInfos}
          creator={creator}
          count={count}
        />
      </Router >
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('create 6 div tags', () => {
    expect(wrapper.find('div').length).toEqual(6);
  });

  it('shows texts for each div', () => {
    expect(wrapper.find('[data-testid="count"]').prop('children')).toEqual(4);
    expect(wrapper.find('[data-testid="title"]').text()).toEqual('mock1');
    expect(wrapper.find('[data-testid="creator"]').text()).toEqual('Test Author1');
    expect(wrapper.find('[data-testid="updatedAt"]').text()).toEqual('2020-11-28 02:36');
    expect(wrapper.find('[data-testid="isShared"]').text()).toEqual('X');
  });
});
