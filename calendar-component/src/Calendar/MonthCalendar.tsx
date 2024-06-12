import { CalendarProps } from '.';
import {Dayjs} from 'dayjs';
import CalendarLocale from './locale/zh-CN';
import { useContext } from 'react';
import LocaleContext from './locale/LocaleContext';
import allLocales from './locale';
import cs from 'classnames';

interface MonthCalendarProps extends CalendarProps{
    selectHandler?: (date: Dayjs) => void,
    curMonth: Dayjs
}


function getAllDays(date:Dayjs){
    
    // 当前月天数
    const allDay = date.daysInMonth()
    // 当前月第一天日期
    const firstDay = date.startOf('month')
    // 星期
    const weekDate = firstDay.day()

    // 固定面板显示42天
    const daysInfo: Array<{date: Dayjs, currentMonth: boolean}> = new Array(6 * 7);
    // 计算当前月份开始前的日期(每周七天，不一定从周日开始)
    // 若该月第一天为周六，即weekdate为6，则日历需展示上个月最后6天
    for(let i = 0;i<weekDate;i++){
        daysInfo[i]={
            date:firstDay.subtract(weekDate-i,'day'),
            currentMonth:false
        }
    }

    //若当月第一天从周日开始，视图直接从当前月展示
    for(let i = weekDate;i<daysInfo.length;i++){
        const calcDate = firstDay.add(i-weekDate,'day')

        daysInfo[i]={
            date:calcDate,
            currentMonth:calcDate.month()===date.month()
        }
    }

    return daysInfo
}

function renderDays(days:Array<{date: Dayjs, currentMonth: boolean}>,
    dateRender:MonthCalendarProps['dateRender'],
    dateInnerContent:MonthCalendarProps['dateInnerContent'],
    value: Dayjs,
    selectHandler: MonthCalendarProps['selectHandler']
){
    const rows = []
    for(let i = 0;i<6;i++){
        const cols = []
        for(let j = 0;j<7;j++){
            const item = days[i*7+j];
            cols[j] = <div className={'calendar-month-body-cell' + (item.currentMonth ? ' calendar-month-body-cell-current':'')}
            onClick={() => selectHandler?.(item.date)}>
                {dateRender ? dateRender(item.date) : (
                        <div className="calendar-month-body-cell-date">
                           <div className={
                                cs("calendar-month-body-cell-date-value",
                                    value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                                        ? "calendar-month-body-cell-date-selected"
                                        : ""
                                )
                            }>{item.date.date()}</div>
                            <div className="calendar-month-body-cell-date-content">{dateInnerContent?.(item.date)}</div>
                        </div>
                    )}</div>
        }
        rows.push(cols)
    } 
    return rows.map(row=>{return <div className='calendar-month-body-row'>{row}</div>})
}

function MonthCalendar(props:MonthCalendarProps){
    const {
        value,
        curMonth,
        dateRender,
        dateInnerContent,
        selectHandler
    } = props;

    // 获取当前语言环境
    const localeContext = useContext(LocaleContext);
    const CalendarLocale = allLocales[localeContext.locale];

    const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    // 根据当前日期获取当前月的所有日期信息
    const allDays = getAllDays(curMonth);

    return(
        <div className="calendar-month">
            <div className="calendar-month-week-list">
                {weekList.map(item=>{
                    return <div className="calendar-month-week-list-item" key={item}>{CalendarLocale.week[item]}</div>})}
            </div>
            <div className='calendar-month-body'>{renderDays(allDays, dateRender, dateInnerContent,value,selectHandler)}</div>
        </div>
    )
}

export default MonthCalendar;