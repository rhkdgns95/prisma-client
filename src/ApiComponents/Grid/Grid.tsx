import React from 'react';
import DataGrid, { Column, HeaderFilter, Editing, Selection, Paging, Pager, Export, FilterRow, SearchPanel, Summary, TotalItem, Lookup } from 'devextreme-react/data-grid';
import { SelectBox, 
  // CheckBox, 
  Button, 
  CheckBox
} from 'devextreme-react';
// import service from './data';
// import DataSource from 'devextreme/data/data_source';
// import ArrayStore from 'devextreme/data/array_store';

const status_tok = [
  {
    'Name': "WAIT"
  },
  {
    'Name': "ACCEPTED"
  },
  {
    'Name': "CANCELED"
  }
]

/**
 * 
 *  Paging: https://js.devexpress.com/Documentation/Guide/Widgets/DataGrid/Paging/#User_Interaction
 *  
 */


// const saleAmountEditorOptions = { format: 'currency', showClearButton: true };

/**
 * 
 *  Grid
 * 
 *  - 기능
 *  정렬, 필터링, 페이지네이션,
 *   
 *  
 */

 

/*
 *  props
 *  - defaultPageSize
 */

/**
 *  State
 *  - showFilterRow: 
 *  - showHeaderFilter: 
 *  - currentFilter: 현재 필터링 된 칼럼.
 *  - pageSize: 테이블에 보이는 row갯수.
 *
 */

interface IProps {
  orders: Array<IPayment>
  updatePayment: (data: any) => any;
}

interface IState {
  showFilterRow: any;
  showHeaderFilter: any;
  currentFilter: any;  
  pageSize: number;    
  isGridDetails: boolean;
  selectTextOnEditStart: boolean;
  startEditAction: 'click' | 'dblClick';
  mode: 'nextColumn' | 'widget';
  selectedItemKeys: Array<IPayment>;
}

const resizingModes: Array<'nextColumn' | 'widget'> = ['nextColumn', 'widget'];


// const dataSource = new DataSource({
//   store: new ArrayStore({
//     data: service.getOrders(),
//     key: 'ID'
//   })
// });
class Grid extends React.Component<IProps, IState> {

    applyFilterTypes: any;
    saleAmountHeaderFilter: any;
    dataGrid: any;
    column: any;
    defaultPageSize: number; 
    pageIndex: Array<number>;

    constructor(props: IProps) {
    super(props);
    this.state = {
      showFilterRow: true,
      showHeaderFilter: true,
      currentFilter: 1,
      pageSize: 10,
      selectTextOnEditStart: true,
      startEditAction: 'dblClick',
      mode: resizingModes[0],
      selectedItemKeys: [],
      isGridDetails: false
    };
    console.log("props: ", props);
    console.log("this.orders: ", this.props.orders);
    this.defaultPageSize = 10;

    // 데이터 바뀌면, 아래 orders는 dataSource와 다르게 넣어줄 것.
    // this.orders = dataSource;
    // this.pageIndex = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    this.pageIndex = Array.from({ length: 10 }, (_, count) => (count + 1) * 2);
    

    this.applyFilterTypes = [{
      key: 'auto',
      name: 'Immediately'
    }, {
      key: 'onClick',
      name: 'On Button Click'
    }];
    this.saleAmountHeaderFilter = [{
      text: 'Less than $3000',
      value: ['SaleAmount', '<', 3000]
    }, {
      text: '$3000 - $5000',
      value: [
        ['SaleAmount', '>=', 3000],
        ['SaleAmount', '<', 5000]
      ]
    }, {
      text: '$5000 - $10000',
      value: [
        ['SaleAmount', '>=', 5000],
        ['SaleAmount', '<', 10000]
      ]
    }, {
      text: '$10000 - $20000',
      value: [
        ['SaleAmount', '>=', 10000],
        ['SaleAmount', '<', 20000]
      ]
    }, {
      text: 'Greater than $20000',
      value: ['SaleAmount', '>=', 20000]
    }];
    
    this.dataGrid = null;
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    this.onShowFilterRowChanged = this.onShowFilterRowChanged.bind(this);
    this.onShowHeaderFilterChanged = this.onShowHeaderFilterChanged.bind(this);
    this.onCurrentFilterChanged = this.onCurrentFilterChanged.bind(this);
    this.onChangePageSize = this.onChangePageSize.bind(this);
    this.onSelectTextOnEditStartChanged = this.onSelectTextOnEditStartChanged.bind(this);
    this.onStartEditActionChanged = this.onStartEditActionChanged.bind(this);
    this.changeResizingMode = this.changeResizingMode.bind(this);
    this.selectionChanged = this.selectionChanged.bind(this);
    this.deleteRecords = this.deleteRecords.bind(this);
    this.toggleGridTableDetails = this.toggleGridTableDetails.bind(this);
  }

  render() {
    return (
      <div className={"api-container"}>
        <button onClick={this.toggleGridTableDetails} style={{
            backgroundColor: "white",
            padding: "5px 7px",
            borderRadius: "3px",
            border: "1px solid #dfdfdf",
            cursor: "pointer",
            margin: "5px 0",
            textAlign: 'right',
            marginLeft: 'auto',
            display: 'block',
            fontSize: '11px',
            color: 'gray'
        }}>
          { this.state.isGridDetails ? "숨기기" : "자세히" }
        </button>
        
         <div className="options" style={this.state.isGridDetails ? { height: "auto", opacity: 1, transition: ".5s" } : { opacity: 0, height: 0, zIndex: -1, cursor: "default", transform: 'scale(0)', marginRight: "20%" } }>
          <div className="option">
            <span>Start Edit Action</span>
                &nbsp;
            <SelectBox
              items={['click', 'dblClick']} 
              value={this.state.startEditAction}
              onValueChanged={this.onStartEditActionChanged}>
            </SelectBox>
          </div>
          <div className="option">
            <CheckBox
              value={this.state.selectTextOnEditStart}
              text="Select Text on Edit Start"
              onValueChanged={this.onSelectTextOnEditStartChanged}
            />
          </div>

          <div className="option">
            <span>Apply Filter </span>
            <SelectBox items={this.applyFilterTypes}
              value={this.state.currentFilter}
              onValueChanged={this.onCurrentFilterChanged}
              valueExpr="key"
              displayExpr="name"
              disabled={!this.state.showFilterRow} />
          </div>
          <div className="option">
            <CheckBox text="Filter Row"
              value={this.state.showFilterRow}
              onValueChanged={this.onShowFilterRowChanged} />
          </div>
          <div className="option">
            <CheckBox text="Header Filter"
              value={this.state.showHeaderFilter}
              onValueChanged={this.onShowHeaderFilterChanged} />
          </div>
        
          <div className="option">
            <span>Column resizing mode:&nbsp;</span>
            <SelectBox items={resizingModes}
              value={this.state.mode}
              width={250}
              onValueChanged={this.changeResizingMode} />
          </div>
       
        </div>
        pageCount: 
        <select onChange={this.onChangePageSize} defaultValue={this.defaultPageSize} style={{
          padding: "5px 7px",
          borderRadius: "3px",
          border: "1px solid #dfdfdf",
          cursor: "pointer",
          margin: "3px"
        }}>
          {
            this.pageIndex.map((item, key) => <option key={key} value={item}>{ item }</option> )
          }
        </select>
        

        <Editing
            mode="cell"
            allowUpdating={true} />
        <Button 
          id="gridDeleteSelected"
          text="Delete Selected Records"
          height={34}
          disabled={!this.state.selectedItemKeys.length}
          onClick={this.deleteRecords} />

        
        <DataGrid id="gridContainer"
          ref={(ref) => this.dataGrid = ref}
          dataSource={this.props.orders}
          showBorders={true}
          allowColumnResizing={true}
          selectedRowKeys={this.state.selectedItemKeys}
          onSelectionChanged={this.selectionChanged}
          // wordWrapEnabled={true}
          onRowUpdated={data => {
            // Table 전체 행 업데이트 완료시 실행됨.
            console.log("onRowUpdated: ", data);
          }}
          onRowUpdating={data => {
            // Table 전체 행 업데이트 중 실행됨. 
            // newData와 oldData를 제공해줌.
            // 저장 클릭 시 해당 이벤트가 실행됨.
            const { updatePayment } = this.props;
            const { newData, oldData: { tscode }} = data;
            updatePayment({
              variables: {
                data: {
                  ...newData
                },
                where: {
                  tscode
                }
              }
            });

            console.log("onRowUpdating: ", data);
            return data;
          }}
          onEditorPrepared={data => {
            // console.log("DATA: ", data);
            return data;
          }}>
        <Selection mode="multiple" />
        <Paging 
            defaultPageSize={this.defaultPageSize} 
            pageSize={this.state.pageSize}
        />
        <Editing
          mode="batch"
          allowUpdating={true}
          allowAdding={true}
          selectTextOnEditStart={this.state.selectTextOnEditStart}
          startEditAction={this.state.startEditAction}
        />
        <Pager
          showNavigationButtons={true}
          showPageSizeSelector={true}
          // allowedPageSizes={[1, 2, 3]}
          allowedPageSizes={[]}
          infoText={
            (currentIdx: number, totalIdx: number, totalCnt: number) => {
              return `BKD_현재_커서_${currentIdx} / BKD_마지막_커서_${totalIdx} / BKD_전체_데이터_${totalCnt}`;
            }
          }
          showInfo={true} 
        />
        <Export enabled={true} fileName="orders" allowExportSelectedData={true} />
        <FilterRow 
          visible={this.state.showFilterRow}
          applyFilter={this.state.currentFilter} 
        />
        <HeaderFilter visible={this.state.showHeaderFilter} />
        <SearchPanel 
          visible={true}
          width={240}
          placeholder="Search..." 
        /> 
          {/* <Column 
            dataField="OrderNumber"
            width={140}
            dataType="number"
            allowEditing={false}
            caption="Invoice Number">
            <HeaderFilter groupInterval={10000} />
          </Column> */}
          {/* <Column dataField="OrderDate"
            alignment="right"
            dataType="date"
            width={120}
            calculateFilterExpression={this.calculateFilterExpression}
            >
            <HeaderFilter dataSource={this.orderHeaderFilter} />
          </Column>
          <Column dataField="DeliveryDate"
            alignment="right"
            dataType="datetime"
            format="M/d/yyyy, HH:mm"
            width={180} /> */}
          {/* <Column dataField="SaleAmount"
            alignment="right"
            dataType="number"
            format="currency"
            // hidingPriority={0}
            editorOptions={saleAmountEditorOptions}>
            <HeaderFilter dataSource={this.saleAmountHeaderFilter} />
          </Column>
          <Column dataField="Employee" />
          <Column dataField="CustomerStoreCity"
            caption="City">
            <HeaderFilter allowSearch={true} />
          </Column> */}

          {/* [1] 칼럼 시작함. */}
          <Column 
            width="auto"
            alignment="right"
            dataField="tscode"
            allowEditing={false}
            caption="U_ID(tscode)">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            alignment="right"
            dataField="tok"
            caption="구분(tok)">
            <HeaderFilter allowSearch={true} />
            <Lookup dataSource={status_tok} valueExpr="Name" displayExpr="Name" />
          </Column>
          <Column 
            visible={false}
            width="auto"
            alignment="right"
            dataField="tnumber"
            caption="tnumber">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            alignment="right"
            dataField="mname"
            caption="성명(mname)">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            alignment="right"
            dataField="mid"
            caption="아이디(mid)">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            dataType="number"
            format="currency"
            alignment="right"
            dataField="spay"
            caption="결제금액(spay)"
            editorOptions={this.saleAmountHeaderFilter}
            >
            <HeaderFilter allowSearch={true} dataSource={this.saleAmountHeaderFilter}/>
          </Column>
          <Column 
            visible={false}
            width="auto"
            alignment="right"
            dataField="trno"
            caption="trno">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            alignment="right"
            dataType="datetime"
            format="M/d/yyyy, HH:mm"
            dataField="reg_date"
            caption="가입일시(reg_date)">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            alignment="right"
            dataType="datetime"
            format="M/d/yyyy, HH:mm"
            dataField="pay_dtm"
            caption="결제일시(pay_dtm)">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            visible={false}
            width="auto"
            alignment="right"
            dataField="content"
            caption="content">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            visible={false}
            alignment="right"
            dataField="bpay"
            caption="bpay">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            visible={false}
            alignment="right"
            dataField="qpay"
            caption="qpay">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            visible={false}
            alignment="right"
            dataField="brefund"
            caption="brefund">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            visible={false}
            alignment="right"
            dataField="qrefund"
            caption="qrefund">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            alignment="right"
            dataField="accea"
            caption="기본형 신청계좌 수(accea)">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            alignment="right"
            dataField="qaccea"
            caption="퀵형 신청계좌 수(qaccea)">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            visible={false}
            width="auto"
            alignment="right"
            dataField="req_day"
            caption="req_day">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            visible={false}
            width="auto"
            alignment="right"
            dataField="req_qday"
            caption="req_qday">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            visible={false}
            width="auto"
            alignment="right"
            dataField="endday"
            caption="endday">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            visible={false}
            width="auto"
            alignment="right"
            dataField="qendday"
            caption="qendday">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            visible={false}
            width="auto"
            alignment="right"
            dataField="msg2"
            caption="msg2">
            <HeaderFilter allowSearch={true} />
          </Column>
          <Column 
            width="auto"
            alignment="right"
            dataType='date'
            dataField="createdAt"
            calculateFilterExpression={this.calculateFilterExpression}
            caption="생성일(createdAt)">
            <HeaderFilter allowSearch={true} dataSource={this.orderHeaderFilter}/>
          </Column>
          <Column 
            width="auto"
            alignment="right"
            dataField="updatedAt"
            dataType="datetime"
            format="M/d/yyyy, HH:mm"
            caption="업데이트일(updatedAt)">
            <HeaderFilter allowSearch={true} />
          </Column>

          {/* [1] 칼럼 종료함. */}
          <Summary>
            <TotalItem
              column="tscode"
              summaryType="count" />
            <TotalItem
              column="tnumber"
              summaryType="sum" />
            <TotalItem
              column="OrderNumber"
              // summaryType=""
              // customizeText={data => {
              //   console.log("DATA: ", data);
              //   console.log("this.state.selectedItemKeys[0];: ", this.state.selectedItemKeys);
              //   let total: number = 0;
              //   this.state.selectedItemKeys.map(currentId => {
              //     const currentData = this.orders.store()._array.find(item => {
              //       return item.ID === currentId;
              //     });
              //     // console.log("currentData: ", currentData);
              //     if(currentData && currentData.SaleAmount) {
              //       total += currentData.SaleAmount;
              //     }
              //   });
              //   return total > 0 ? `Checked: $${total}` : ``;
              // }}
              valueFormat="currency" />
          </Summary>
        </DataGrid> 
      </div>
    );
  }
  
  calculateFilterExpression(value: any, selectedFilterOperations: any, target: any) {
    console.log("calculateFilterExpression: ", value);
    console.log("target: ", target);
    let column: any = this;
    if (target === 'headerFilter' && value === 'weekends') {
      return [[getOrderDay, '=', 0], 'or', [getOrderDay, '=', 6]];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }
  orderHeaderFilter(data: any) {
    data.dataSource.postProcess = (results: any) => {
      results.push({
        text: 'Weekends',
        value: 'weekends'
      });

      return results;
    };
  } 
  onShowFilterRowChanged(e: any) {
    this.setState({
      showFilterRow: e.value
    });
    this.clearFilter();
  }
  onShowHeaderFilterChanged(e: any) {
    this.setState({
      showHeaderFilter: e.value
    });
    this.clearFilter();
  }

  onCurrentFilterChanged(e: any) {
    this.setState({
      currentFilter: e.value
    });
  }
  clearFilter() {
    this.dataGrid.instance.clearFilter();
  }
  changeResizingMode(data: any) {
    this.setState({ mode: data.value });
  }
  /**
   *  deleteRecords = () => {}
   *  
   *  - 데이터를 삭제 했을경우, 발생하는 이벤트
   */
  deleteRecords() {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    console.log("삭제될 키값: ", this.state.selectedItemKeys);
    if(isConfirm) {
      this.state.selectedItemKeys.forEach((selectedItem) => {
        const newOrders = this.props.orders.filter(item => item.tscode !== selectedItem.tscode);
        // this.setState({
        //   orders: newOrders
        // })
        console.log("newOrders: ", newOrders);
      });
      this.setState({
        selectedItemKeys: []
      });
      // this.orders.reload();
    } 
  }
  selectionChanged(data: any) {
    console.log("selectionChanged: ", data);
    this.setState({
      selectedItemKeys: data.selectedRowKeys
    });
  }
   /**
   *  onSelectTextOnEditStartChanged = () => {}
   *  
   *  - StartEditAciton 속성 - 한번 클릭 / 더블클릭 중 택 1.
   */
  onSelectTextOnEditStartChanged(args: any) {
    console.log("onSelectTextOnEditStartChanged: ", args);
    this.setState({
      selectTextOnEditStart: args.value
    });
  }
  /**
   *  onStartEditActionChanged = () => {}
   *  
   *  -텍스트 변경 완료.
   */
  onStartEditActionChanged(args: any) {
    this.setState({
      startEditAction: args.value
    });
  }
//   customizeDate(data) {
//     return "";
//     // return `First: ${ Globalize.formatDate(data.value, { date: 'medium' })}`;
//     // return `First: ${data})}`;
//   }

//   /** Start New Function */

  /**
   *  onChangePageSize = () => {} 
   *  - pageSize 변경 이벤트
   */
  onChangePageSize(event: React.ChangeEvent<HTMLSelectElement>) {
    const { target: { value }} = event;
    this.setState({
      pageSize: parseInt(value)
    });
  }
  /**
   *  func toggleGridTableDetails
   *   - Grid Table을 '자세히 보기'
   */
  toggleGridTableDetails() {
    this.setState({
      isGridDetails: !this.state.isGridDetails
    });
  }
 /** End New Function */
}

function getOrderDay(data: any) {
  console.log("getOrderDay: ", data);
  return new Date(data.createdAt).getDay();
}



export default Grid;