import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "components/common/CustomTable";
import CustomBreadCrumbs from "components/common/CustomBreadCrumbs";
import { Box, Button, Divider } from "@mui/material";
import CustomInput from "components/common/CustomInput";

const Genres = ({ values }: any) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {values.map((genre:string, idx: number) => {
        return (
          <span key={idx} className="badge">
            {genre}
          </span>
        );
      })}
    </>
  );
};

const MyKit = () => {
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "TV Show",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "show.name",
          },
          {
            Header: "Type",
            accessor: "show.type",
          },
        ],
      },
      {
        // Second group - Details
        Header: "Details",
        // Second group columns
        columns: [
          {
            Header: "Language",
            accessor: "show.language",
          },
          {
            Header: "Genre(s)",
            accessor: "show.genres",
            Cell: ({ cell: { value } }: any) => <Genres values={value} />,
          },
          {
            Header: "Runtime",
            accessor: "show.runtime",
            Cell: ({ cell: { value } }) => {
              const hour = Math.floor(value / 60);
              const min = Math.floor(value % 60);
              return (
                <>
                  {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
                  {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
                </>
              );
            },
          },
          {
            Header: "Status",
            accessor: "show.status",
          },
        ],
      },
    ],
    []
  );

  const breadcrumbData = [
    {
      link: "/test",
      text: "Test",
    },
    {
      text: "Home",
    },
  ];

  useEffect(() => {
    (async () => {
      const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
      setData(result.data);
    })();
  }, []);
  return (
    <div className="p-6">
      <div className="my-6">
        <div className="text-2xl font-bold">Breadcrumb</div>
        <CustomBreadCrumbs breadcrumbData={breadcrumbData} />
      </div>

      <Divider />

      <div className="my-6">
        <div className="text-2xl font-bold">Table</div>
        <CustomTable columns={columns} data={data} />
      </div>

      <Divider />

      <div className="my-6">
        <div className="text-2xl font-bold">Input</div>
        <CustomInput label="Name" Placeholder="Name" />
      </div>

      <Divider />

      <div className="my-6">
        <div className="text-2xl font-bold">Form with required validations</div>
        <Box component="form">
          <CustomInput
            label="Organization Name"
            placeholder="ex. Lenovo's Private"
            required
          />
          <Button type="submit">Submit</Button>
        </Box>
      </div>
    </div>
  );
};

export default MyKit;
