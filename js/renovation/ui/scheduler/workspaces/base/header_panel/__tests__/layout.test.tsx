import { shallow } from 'enzyme';
import { viewFunction as LayoutView } from '../layout';
import { Row } from '../../row';
import { getKeyByDateAndGroup } from '../../../utils';

jest.mock('../../row', () => ({
  Row: () => null,
}));
jest.mock('../../../utils', () => ({
  getKeyByDateAndGroup: jest.fn(),
}));

describe('HeaderPanelLayoutBase', () => {
  describe('Render', () => {
    const cellTemplate = () => null;
    const viewCellsData = [[
      {
        startDate: new Date(2020, 6, 9), endDate: new Date(2020, 6, 10), today: true, groups: 1,
      },
      {
        startDate: new Date(2020, 6, 10), endDate: new Date(2020, 6, 11), today: false, groups: 1,
      },
    ]];
    const render = (viewModel) => shallow(LayoutView({
      ...viewModel,
      props: { cellTemplate, ...viewModel.props, viewCellsData },
    } as any) as any);

    afterEach(() => jest.resetAllMocks());

    it('should combine `className` with predefined classes', () => {
      const layout = render({ props: { className: 'custom-class' } });

      expect(layout.hasClass('dx-scheduler-header-panel'))
        .toBe(true);
      expect(layout.hasClass('custom-class'))
        .toBe(true);
    });

    it('should spread restAttributes', () => {
      const layout = render({ restAttributes: { customAttribute: 'customAttribute' } });

      expect(layout.prop('customAttribute'))
        .toBe('customAttribute');
    });

    it('should render components correctly', () => {
      const layout = render({});

      expect(layout.find('table').exists())
        .toBe(true);
      expect(layout.find('thead').exists())
        .toBe(true);

      const row = layout.find(Row);
      expect(row.exists())
        .toBe(true);
      expect(row)
        .toHaveLength(1);
      expect(row.children())
        .toHaveLength(2);
    });

    it('should render cells and pass correct props to them', () => {
      const layout = render({});

      const cells = layout.find(cellTemplate);
      expect(cells)
        .toHaveLength(2);

      expect(cells.at(0).props())
        .toMatchObject({
          startDate: viewCellsData[0][0].startDate,
          endDate: viewCellsData[0][0].endDate,
          today: viewCellsData[0][0].today,
        });
      expect(cells.at(1).props())
        .toMatchObject({
          startDate: viewCellsData[0][1].startDate,
          endDate: viewCellsData[0][1].endDate,
          today: viewCellsData[0][1].today,
        });
    });

    it('should call getKeyByDateAndGroup with correct parameters', () => {
      render({});

      expect(getKeyByDateAndGroup)
        .toHaveBeenCalledTimes(2);

      expect(getKeyByDateAndGroup)
        .toHaveBeenNthCalledWith(
          1, viewCellsData[0][0].startDate,
          viewCellsData[0][0].groups,
        );
      expect(getKeyByDateAndGroup)
        .toHaveBeenNthCalledWith(
          1, viewCellsData[0][0].startDate,
          viewCellsData[0][0].groups,
        );
    });
  });
});
