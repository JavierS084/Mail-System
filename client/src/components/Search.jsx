"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useDependencies } from "@/context/DependenciesContext";

function Search() {
  const { dependencies, loadDependencies } = useDependencies();

  useEffect(() => {
    loadDependencies();
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = dependencies.filter((dependency) => {
      return dependency.dependencia
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const showError = filteredData.length === 0;
  const showSearch = filteredData.length !== 0;

  return (
    <div className="card">
      <form className="d-flex col-md-10 mx-auto p-4">
        <input
          className="form-control"
          type="text"
          autoFocus={true}
          placeholder="Search..."
          value={wordEntered}
          onChange={handleFilter}
        />
      </form>
      <div className="card-body">
        <h4>Resultado</h4>
        <hr />
        {filteredData.length !== 0 && (
          <table
            className="table table-borderles"
            style={{ display: showSearch ? "" : "none" }}
          >
            <tr className="border-bottom">
            <td className="px-2">
                <b>ID</b>
              </td>
              <td className="px-2">
                <b>Dependencias</b>
              </td>
            </tr>
            {filteredData.slice(0, 15).map((dependency) => {
              return (
                <tr className="border-bottom" key={dependency.id}>
                    <td>{dependency.id} </td>
                  <td>{dependency.dependencia} </td>
                </tr>
                
              );
            })}
          </table>
        )}
        {wordEntered === "" ? (
          <div className="alert alert-success animate_animated">
            Escriba la dependencia que busca
          </div>
        ) : (
          <div
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? "" : "none" }}
          >
            No existe dicha Dependencia: <b>{wordEntered}</b>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
