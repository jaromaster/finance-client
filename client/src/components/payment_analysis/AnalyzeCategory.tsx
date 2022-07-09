import React from "react";
import { create_count_map, PaymentInterface } from "../../helper_funcs/helper";
import PlotCategory from "./PlotCategory";


/**
 * PropsInterface defines props
 */
interface PropsInterface {
    payments: PaymentInterface[]
}


/**
 * AnalyzeCategory displays stats of category column
 */
const AnalyzeCategory = (props: PropsInterface) => {
    const categories: string[] = props.payments.map(p => p.payment_category); // get categories
    const count_map = create_count_map(categories); // count each category

    // get keys and values of count_map
    let categories_unique: string[] = [];
    let counts: number[] = [];
    count_map.forEach((v, k)=> {
        categories_unique.push(k);
        counts.push(v);
    });


    return (
        <div>
            <h2>Category Stats</h2>
            {/* plot */}
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{flexBasis: "800px"}}>
                    <PlotCategory categories={categories_unique} counts={counts} />
                </div>
            </div>
        </div>
    )
}

export default AnalyzeCategory;