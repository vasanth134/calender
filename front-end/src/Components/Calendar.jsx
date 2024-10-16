import { Calendar as BigCalendar,CalendarProps,momentLocalizer} from "react-big-calendar"
import moment from "moment"

const localizer = momentLocalizer(moment);

export default function Calendar(props){
<>

<BigCalendar {...props} localizer={localizer} />
</>

}