import { h } from 'preact';
import { shallow } from 'enzyme';
import { viewFunction as RowView } from '../row';

jest.mock('../../row', () => ({
  ...require.requireActual('../../row'),
  Row: (props) => <div {...props} />,
}));

describe('RowBase', () => {
  describe('Render', () => {
    const render = (viewModel) => shallow(RowView({
      ...viewModel,
      props: { ...viewModel.props },
    } as any) as any);

    it('should spread restAttributes', () => {
      const row = render({ restAttributes: { customAttribute: 'customAttribute' } });

      expect(row.prop('customAttribute'))
        .toBe('customAttribute');
    });

    it('should render component correctly', () => {
      const row = render({ props: { className: 'custom-class' } });

      expect(row.hasClass('dx-scheduler-date-table-row'))
        .toBe(true);
    });
  });
});
