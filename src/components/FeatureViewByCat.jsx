import TableByCat from "./TableByCat";
import TreeCase from "./TreeCase";

const FeatureViewByCat = () => {
  return (
    <div className="d-flex h-100 ">
      <div className=" w-25 sticky-sm-top h-100  p-2">
        <TreeCase />
      </div>
      <div className="w-75 h-100 p-2 overflow-auto scrollbar scrollbar-juicy-peach">
        <TableByCat />
      </div>
    </div>
  );
};

export default FeatureViewByCat;
