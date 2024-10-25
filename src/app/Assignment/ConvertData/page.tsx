"use client";

import DisplayUserList from "@/components/DisplayUserList";
import { GroupByDepartment, Hair } from "@/types/UserByDepartment.type";
import { UserResponse } from "@/types/UserResponse.type";
import SearchIcon from "@mui/icons-material/Search";
import { Card, CardContent, CardHeader, InputBase, styled } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Page() {
  const [baseData, setBaseData] = useState<UserResponse>();
  const [searchValue, setSearchValue] = useState("");

  const formatData = useMemo(() => (!baseData ? undefined : groupUsersByDepartment(baseData)), [baseData]);
  const filterBaseData = useMemo(
    () =>
      baseData?.users?.filter((item) => {
        return `${item.firstName}${item.lastName}`.includes(searchValue.replace(/\s/g, ""));
      }) || [],
    [baseData, searchValue],
  );

  const filterFormatData = useMemo(
    () =>
      !!formatData
        ? Object.keys(formatData).filter((dept) => {
            return Object.keys(formatData[dept].addressUser).find((item) =>
              item.includes(searchValue.replace(/\s/g, "")),
            );
          })
        : [],
    [formatData, searchValue],
  );

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((response) => {
        setBaseData(response);
      });
  }, []);

  function groupUsersByDepartment(userResponse: UserResponse): GroupByDepartment {
    const result: GroupByDepartment = {};

    for (const user of userResponse.users) {
      const { department } = user.company;
      const { gender, hair, firstName, lastName, address, age } = user;

      // Avoid repeated department lookups
      if (!result[department]) {
        result[department] = {
          male: 0,
          female: 0,
          ageRange: "",
          hair: { Black: 0, Blond: 0, Chestnut: 0, Brown: 0 },
          addressUser: {},
        };
      }

      const dept = result[department]; // Store department object in a variable to avoid deep lookup

      if (gender === "male") {
        dept.male++;
      } else if (gender === "female") {
        dept.female++;
      }

      const hairColor = hair.color as keyof Hair;
      if (hair.color in dept.hair) {
        dept.hair[hairColor]++;
      }

      // Add user address (combine name once)
      const fullName = `${firstName}${lastName}`;
      dept.addressUser[fullName] = address.address;

      // Calculate age range
      const ageGroup = Math.floor(age / 10) * 10;
      const [userMinAge, userMaxAge] = [ageGroup, ageGroup + 9];
      const [groupMinAge, groupMaxAge] = !!dept.ageRange ? dept.ageRange.split("-").map((item) => +item) : [99, 0];

      const minAge = userMinAge < groupMinAge ? userMinAge : groupMinAge;
      const maxAge = userMaxAge > groupMaxAge ? userMaxAge : groupMaxAge;
      dept.ageRange = `${minAge}-${maxAge}`;
    }

    return result;
  }

  const formatDisplayHair = useCallback((hair: Hair) => {
    return Object.keys(hair)
      .map((type) => `${type}: ${hair[type as keyof Hair]}`)
      .join(", ");
  }, []);

  return (
    <div>
      <title>Assignment - Convert Data</title>
      <meta content="7Solutions - Convert Data Assignment" key="title" property="og:title" />

      {/* Search bar */}
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          inputProps={{ "aria-label": "search" }}
          placeholder="Search name…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Search>

      <div className="flex gap-4">
        {/* Base Data */}
        {!!baseData && (
          <StyledCard className="block border-r-2 border-solid w-28 border-slate-200" sx={{ flex: "0 0 250px" }}>
            {filterBaseData.map((user) => (
              <DisplayUserList key={user.id} user={user} onClick={(name) => setSearchValue(name)} />
            ))}
          </StyledCard>
        )}

        {/* Convert Data */}
        {!!formatData && (
          <StyledCard className="flex-1 p-3">
            <div className="relative flex flex-wrap flex-1 gap-4">
              {filterFormatData.map((dept) => (
                <Card key={dept} sx={{ height: "320px" }}>
                  <CardHeader title={dept} />
                  <CardContent>
                    <div>Male: {formatData[dept].male}</div>
                    <div>Female: {formatData[dept].female}</div>
                    <div>Age-Range: {formatData[dept].ageRange}</div>
                    <div>Hair: {formatDisplayHair(formatData[dept].hair)}</div>
                    <div>
                      Address:
                      <div>
                        {Object.keys(formatData[dept].addressUser).map((userName) => (
                          <div key={userName}>
                            {userName}: {formatData[dept].addressUser[userName]}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </StyledCard>
        )}
      </div>
    </div>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "solid 1px #DEDEDE",
  backgroundColor: "#f5f6fa",
  marginBottom: theme.spacing(2),
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const StyledCard = styled(Card)`
  height: calc(100vh - 190px);
  overflow: auto;
`;
