import React from 'react';
import DataGrid, { Column, HeaderFilter, Editing, Selection, Paging, Pager, Export, FilterRow, SearchPanel, Summary, TotalItem, Lookup, Popup, Position, Form, RequiredRule } from 'devextreme-react/data-grid';
import { SelectBox, 
  // CheckBox, 
  Button, 
  CheckBox,
} from 'devextreme-react';
import { Item } from 'devextreme-react/form';
import Title from '../../../Components/Title';
import { cleanNullArgs } from '../../../Utils/cleanNullArgs';
import { isEmptyObject } from '../../../Utils/isEmptyObject';

// import service from './data';
// import DataSource from 'devextreme/data/data_source';
// import ArrayStore from 'devextreme/data/array_store';

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
  createPayment: (data: any) => any;
  updatePayment: (data: any) => any;
  deletePayment: (data: any) => any;
}

interface IState {
  showFilterRow: any;
  showHeaderFilter: any;
  currentFilter: any;  
  pageSize: number;    
  showDetailRow: boolean;
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

const states = [
  { name: "WAIT" },
  { name: "ACCEPTED" },
  { name: "CANCELED" }
];

class GridPayment extends React.Component<IProps, IState> {

    applyFilterTypes: any;
    saleAmountHeaderFilter: any;
    dataGrid: any;
    column: any;
    defaultPageSize: number; 
    pageIndex: Array<number>;

    constructor(props: IProps) {
    super(props);
    this.state = {
      showDetailRow: false,
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
        {/* <FormCreatePayment /> */}
        <Title name="결제내역"/>
        <div className={"api-wrapper"}>
        {/* 새 칼럼 추가 - 시작 */}
          <DataGrid
            id="form_payment"
            dataSource={{}}
            keyExpr={"id"}
            showColumnHeaders={false}
            onRowInserting={newPayment => {
              // 데이터가 추가될때 발생하는 이벤트.
              const { data: addedData } = newPayment;
              console.log("newPayment: ", newPayment);

              delete addedData.__KEY__;
              const data = cleanNullArgs(addedData);

              console.log("update newPayment: ", data);

              this.props.createPayment({
                variables: {
                  data
                }
              });
              
              
            }}
          >
            <Paging enabled={false} />
            <Editing
              mode="popup"
              allowAdding="true">
              <Popup title="New Payment" showTitle={true} width={700} height={'auto'}>
                <Position my={{x: 5, y: 5}} at={{x: 10, y: 10}} of={window} />
              </Popup>
              <Form>
                <Item itemType="group" caption="Info" colCount={2} colSpan={2}>
                  <Item dataField="tok" isRequired/>
                  <Item dataField="mname" isRequired />
                  <Item dataField="mid" isRequired />
                  <Item dataField="spay" isRequired/>
                  <Item dataField="reg_date" />
                  <Item dataField="pay_dtm" />
                  <Item dataField="bpay"/>
                  <Item dataField="qpay"/>
                  <Item dataField="accea" isRequired/>
                  <Item dataField="qaccea" isRequired/>
                </Item>

                <Item itemType="group" caption="Details" colCount={2} colSpan={2}>
                  <Item
                    dataField="content"
                    editorType="dxTextArea"
                    colSpan={2}
                    editorOptions={{ height: 100 }} />
                </Item>
              </Form>
            </Editing>
            <Column dataField="tok" caption="구분(tok)" dataType="string" width={125} visible={false} >
              <Lookup dataSource={states} valueExpr="name" displayExpr="name" />
            </Column>
            <Column dataField="mname" caption="성명(mname)" dataType="string" visible={false}/>
            <Column dataField="mid" caption="아이디(mid)" dataType="string" visible={false}/>
            <Column dataField="spay" caption="결제금액(spay)" dataType="number" visible={false}/>
            <Column dataField="reg_date" caption="가입일시(reg_date)" dataType="date" visible={false}/>
            <Column dataField="pay_dtm" caption="결제일시(pay_dtm)" dataType="date" visible={false}/>
            <Column dataField="bpay" caption="금액(bpay)" dataType="number" visible={false}/>
            <Column dataField="qpay" caption="(퀵)금액(qpay)" dataType="number" visible={false}/>
            <Column dataField="accea" caption="갯수(accea)" dataType="number" visible={false}/>
            <Column dataField="qaccea" caption="(퀵)갯수(qaccea)" dataType="number" visible={false}/>
            <Column dataField="content" caption="내용(content)" dataType="string" visible={false} />
          </DataGrid>
          {/* 새 칼럼 추가 - 종료 */}
          

          <p style={{
            display: 'flex',
            fontSize: '11px',
            margin: 0,
            marginBottom: '5px'
          }}>
             <button onClick={e => this.setState({ showDetailRow: !this.state.showDetailRow })} style={{
              backgroundColor: "white",
              padding: "5px 7px",
              borderRadius: "3px",
              border: "1px solid #dfdfdf",
              cursor: "pointer",
              marginRight: "5px",
              color: 'gray'
            }}>
              { this.state.showDetailRow ? "간략히" : "자세히"}
            </button>
            <button onClick={this.toggleGridTableDetails} style={{
                backgroundColor: "white",
                padding: "5px 7px",
                borderRadius: "3px",
                border: "1px solid #dfdfdf",
                cursor: "pointer",
                color: 'gray'
            }}>
              { this.state.isGridDetails ? "Close" : "Settings" }
            </button>
           
          </p>
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
          <select onChange={this.onChangePageSize} defaultValue={this.defaultPageSize} style={{
            padding: "5px 7px",
            borderRadius: "3px",
            border: "1px solid #dfdfdf",
            cursor: "pointer",
            marginRight: "7px"
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
            onClick={this.deleteRecords} 
          />
        
            
          
          <DataGrid 
            id="gridContainer"
            ref={(ref) => this.dataGrid = ref}
            dataSource={this.props.orders}
            showBorders={true}
            allowColumnResizing={true}
            keyExpr={"id"}
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
              const { newData, oldData: { id }} = data;
              const notNullData = cleanNullArgs(newData);

              if(notNullData && !isEmptyObject(notNullData)) { // 업데이트할 데이터를 NULL값으로 둔 경우(NULL과 비어있는 객체인지 체크해야함)
                console.log("notNullData: ", notNullData);
                updatePayment({
                  variables: {
                    data: {
                      ...newData
                    },
                    where: {
                      id
                    }
                  }
                });
              } else {
                return;
              }
              
              // console.log("onRowUpdating: ", data);
              return data;
            }}
            onEditorPrepared={data => {
              // console.log("DATA: ", data);
              return data;
            }}
            // onRowRemoving={data => {
            //   console.log("onRowRemoving: ", data);
            // }}  
            onRowRemoved={data => {
              // console.log("onRowRemoved: ", data);
            }}
          >
          <Selection mode="multiple" />
          <Paging 
              defaultPageSize={this.defaultPageSize} 
              pageSize={this.state.pageSize}
          />
          {/* Popup Start */}
        
          {/* Popup End */}
          <Editing
            mode="batch"
            allowUpdating={true}
            // allowAdding={true}
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
                // return `${currentIdx} / 마지막_커서_${totalIdx} / 전체_데이터_${totalCnt}`;
                return `Page ${currentIdx} of ${totalIdx} (${totalCnt} items)`;
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
              dataField="id"
              allowEditing={false}
              fixed={true}
              caption="U_ID(id)">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              width="auto"
              alignment="right"
              dataField="tok"
              caption="구분(tok)">
              <HeaderFilter allowSearch={true} />
              <Lookup dataSource={states} valueExpr="name" displayExpr="name" />
            </Column>
            <Column 
              visible={this.state.showDetailRow}
              width="auto"
              alignment="right"
              allowEditing={false}
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
              <RequiredRule />
            </Column>
            <Column 
              width="auto"
              alignment="right"
              dataField="mid"
              caption="아이디(mid)">
              <HeaderFilter allowSearch={true} />
              <RequiredRule />
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
              <RequiredRule />
            </Column>
            <Column 
              visible={this.state.showDetailRow}
              width="auto"
              alignment="right"
              dataField="trno"
              allowEditing={false}
              caption="trno">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              width="auto"
              alignment="right"
              dataType="datetime"
              format="M/d/yyyy, HH:mm"
              dataField="reg_date"
              caption="가입일시(reg_date)">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              width="auto"
              alignment="right"
              dataType="datetime"
              format="M/d/yyyy, HH:mm"
              dataField="pay_dtm"
              caption="결제일시(pay_dtm)">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              visible={this.state.showDetailRow}
              width="auto"
              alignment="right"
              dataField="content"
              caption="content">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              width="auto"
              visible={this.state.showDetailRow}
              alignment="right"
              dataField="bpay"
              caption="bpay">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              width="auto"
              visible={this.state.showDetailRow}
              alignment="right"
              dataField="qpay"
              caption="qpay">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              width="auto"
              visible={this.state.showDetailRow}
              alignment="right"
              dataField="brefund"
              caption="brefund">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              width="auto"
              visible={this.state.showDetailRow}
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
              <RequiredRule />
            </Column>
            <Column 
              width="auto"
              alignment="right"
              dataField="qaccea"
              caption="퀵형 신청계좌 수(qaccea)">
              <HeaderFilter allowSearch={true} />
              <RequiredRule />
            </Column>
            <Column 
              allowEditing={false}
              visible={this.state.showDetailRow}
              width="auto"
              alignment="right"
              dataField="req_day"
              caption="req_day">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              visible={this.state.showDetailRow}
              width="auto"
              alignment="right"
              dataField="req_qday"
              caption="req_qday">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              visible={this.state.showDetailRow}
              width="auto"
              alignment="right"
              dataField="endday"
              caption="endday">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              visible={this.state.showDetailRow}
              width="auto"
              alignment="right"
              dataField="qendday"
              caption="qendday">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              visible={this.state.showDetailRow}
              width="auto"
              alignment="right"
              dataField="msg2"
              caption="msg2">
              <HeaderFilter allowSearch={true} />
            </Column>
            <Column 
              allowEditing={false}
              width="auto"
              alignment="right"
              dataType='date'
              dataField="createdAt"
              calculateFilterExpression={this.calculateFilterExpression}
              caption="생성일(createdAt)">
              <HeaderFilter allowSearch={true} dataSource={this.orderHeaderFilter}/>
            </Column>
            <Column 
              allowEditing={false}  
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
                column="id"
                summaryType="count" 
              />
              {/* <TotalItem
                column="id"
                summaryType="Total" /> */}
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
  deleteRecords(data: any) {
    console.log("DELETE: ", data);
    const isConfirm = window.confirm("삭제하시겠습니까?");
    
    if(isConfirm) {
      // console.log("삭제될 키값: ", this.state.selectedItemKeys);

      this.state.selectedItemKeys.forEach((selectedPayment) => {
        // const newOrders = this.props.orders.filter(item => item.id !== selectedItem.id);
        // console.log("newOrders: ", newOrders);

        // console.log("selectedPayment: ", selectedPayment);

        this.props.deletePayment({
          variables: {
            where: {
              id: selectedPayment
            }
          }
        });
        
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


export default GridPayment;