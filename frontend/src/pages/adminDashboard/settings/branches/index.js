import ListFormHoc from "../../../../utils/listFormHoc";
import List from "./list";
import Form from "./form";

export default function Branches() {
   return (
    <>
        <ListFormHoc List={List} Form={Form}></ListFormHoc>
    </>
   );
}
