import { FormikProps } from "formik";
import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";

type key = { [key:string] : string; }
interface OptionsProps {
    index: number;
    name: string;
    columns: string[];
    rows: string[];
    formik: FormikProps<{ [key: string]: string | string[] | key; }>;
}

export const MultipleOptionsForGrid = ( {columns, rows, formik, index, ...props} : OptionsProps) => {

    /*
    Recibo el name y los values(columnas)
    Pinto el nombre del row 
    Itero cada columna, renderizo cada checkbox(name el row, value el nombre de la columna)
    */

    const { setFieldValue, values, getFieldProps } = formik; 

    const gridOptionsMap : {[x : string] : string} = {};

    rows.map((r : string) => {
      gridOptionsMap[r] = `${props.name}.${r}`;
    }) 

    const rowName = (name : string) : string => {
      return(gridOptionsMap[`${name}`]);
    }

    const checkedValues = ( item: string , fieldName: string ) : boolean => {
      const fields : string[] = getFieldProps(fieldName).value
      const isChecked = fields.indexOf(item) != - 1;
      return isChecked;
    }
    
    const onInputChange =  (item: string , fieldName: string) => {

      let items : string[] = getFieldProps(fieldName).value == '' 
        ? [] 
        : getFieldProps(fieldName).value;

      const itemIndex = items.indexOf(item);

      if( itemIndex == - 1 ) {
        items.push(item)
      }else{
        items.splice(itemIndex, 1)
      }

      setFieldValue(fieldName, items)
      
    }

  return (  
          <View>
                <View style={{paddingHorizontal:5}}>
                      <View>
                            <Text> {columns[index]} </Text> 
                      </View>
                </View>
                      {
                        rows.map((z : string) =>
                        
                        <View key={z}  style={{flex: 1}}>
                            <View   style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Checkbox
                                  color="#0d3c61"
                                  status={
                                    checkedValues(columns[index], rowName(z)) 
                                      ? 'checked' 
                                      : 'unchecked'}
                                  onPress={() => {
                                    onInputChange(columns[index], rowName(z))
                                  }}  />
                            </View>
                        </View>
                        )
                      }
          </View>    
  )
}
