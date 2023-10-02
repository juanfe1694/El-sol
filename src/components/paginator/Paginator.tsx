import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Lazy } from "../../interfaces/functionalInterfaces";
import { useAppDispatch } from "../../app/hooks";

interface Props {
  lazy: Lazy;
  onChangeLazy: any;
  fetchThunk: any;
  recordsCount: number;
}

export const Paginator = ({
  recordsCount,
  lazy,
  onChangeLazy,
  fetchThunk,
}: Props) => {

  const dispatch = useAppDispatch()

  // const pageLazy = (isNaN(lazy?.page) ? 0 : lazy?.page) * 10 - 10;
  const pageLazy = (isNaN(lazy?.page) ? 0 : lazy?.page);
  const [first, setFirst] = useState(pageLazy);
  const [rows, setRows] = useState(lazy?.rows);
  const [currentPage, setCurrentPage] = useState(pageLazy);

  // const firtRows = first / rows + 1;

  const [prevBasicFirst, setPrevBasicFirst] = useState(first);
  const [prevBasicRows, setPrevBasicRows] = useState(rows);

  const onBasicPageChange = (pageNumber: number) => {
    setFirst(pageNumber);
    setCurrentPage(pageNumber);
  };

  const onPreviousPage = () => {
  if (currentPage > 1) {
    const previousPage = currentPage - 1;
    setFirst(previousPage);
    setCurrentPage(previousPage);
  }
};

const onNextPage = () => {
  if (currentPage < totalPages) {
    const nextPage = currentPage + 1;
    setFirst(nextPage);
    setCurrentPage(nextPage);
  }
};

  const totalPages = Math.ceil(recordsCount / rows);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );


   const fetchDataPaginator = () => {
    if (first !== prevBasicFirst || rows !== prevBasicRows) {
      let lazyDetail = {
          ...lazy,
          page: first,
          rows: rows,
          filter: [
            {
              field: "isDeleted",
              value: "false",
              matchMode: "equals",
            },
          ],
        };
        dispatch(onChangeLazy(lazyDetail));
        dispatch(fetchThunk(lazyDetail));

        setPrevBasicFirst(first);
        setPrevBasicRows(rows);
    }}


    useEffect(() => {
      fetchDataPaginator()
    }, [first, rows])
    

  return (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPreviousPage} style={styles.button}>
      <Text style={styles.buttonText}>{'<'}</Text>
    </TouchableOpacity>
    <View style={styles.pageInfoContainer}>
      <Text style={styles.pageInfoText}>
        Page {currentPage} of {totalPages}
      </Text>
    </View>
    <TouchableOpacity onPress={onNextPage} style={styles.button}>
      <Text style={styles.buttonText}>{'>'}</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  pageInfoContainer: {
    width: "auto",
    height: 40,
    marginVertical: 10,
    // backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  pageInfoText: {
    fontSize: 16,
    color: '#000',
  },
});