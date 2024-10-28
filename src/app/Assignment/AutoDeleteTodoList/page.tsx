"use client";

import JumpingButton from "@/components/JumpingButton";
import JumpingContainer from "@/components/JumpingContainer";
import { AutoDelete } from "@/types/AutoDelete.type";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Page() {
  const [autoDeleteData, setAutoDeleteData] = useState<AutoDelete[]>([]);
  const [jumpingIndex, setJumpingIndex] = useState<number[]>([]);
  const [dataType, setDataType] = useState<string[]>([]);

  // Memo
  // Create all type list that have no selected
  const notSelectedData = useMemo(
    () => autoDeleteData.filter((item) => !jumpingIndex.includes(item.index)),
    [autoDeleteData, jumpingIndex],
  );

  // Callback
  const getItemByType = useCallback(
    (type: string) => autoDeleteData.filter((item) => jumpingIndex.includes(item.index) && item.type === type),
    [autoDeleteData, jumpingIndex],
  );

  useEffect(() => {
    console.log("fetch");
    fetch("/static/json/AutoDeleteData.json")
      .then((response) => response.json())
      .then((data: AutoDelete[]) => {
        const formatData = data.map((item, index) => ({ ...item, index: index }));
        setAutoDeleteData(formatData);

        const groupDataByType = formatData.reduce(
          (acc, cur) => (!acc.includes(cur.type) ? [...acc, cur.type] : acc),
          [] as string[],
        );
        setDataType(groupDataByType);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function handleJumping(itemIn: AutoDelete) {
    setJumpingIndex((prev) => prev.filter((index) => index !== itemIn.index));
    setAutoDeleteData((prev) => [...prev.filter((i) => i.index !== itemIn.index), itemIn]);
  }

  function handleItemMove(item: AutoDelete, isJump = false) {
    if (isJump) {
      handleJumping(item);
    } else {
      setJumpingIndex((prev) => [...prev, item.index]);
    }
  }

  return (
    <div className="jumping-item-container">
      {/* Title */}
      <title>Assignment - Auto Delete Todo List</title>
      <meta content="7Solutions - Auto Delete Todo List Assignment" key="title" property="og:title" />

      <div className="flex flex-col h-full gap-4 md:flex-row md:h-auto ">
        <JumpingContainer name="">
          {notSelectedData.map((item) => (
            <JumpingButton
              autoJump={false}
              delay={5}
              item={item}
              key={item.index}
              onClick={handleItemMove}
              onJumping={handleJumping}
            />
          ))}
        </JumpingContainer>

        {dataType.map((type) => (
          <JumpingContainer key={type} name={type}>
            {getItemByType(type).map((item) => (
              <JumpingButton
                autoJump={!!type}
                delay={5}
                item={item}
                key={item.index}
                onClick={(item) => handleItemMove(item, !!type)}
                onJumping={handleJumping}
              />
            ))}
          </JumpingContainer>
        ))}
      </div>
    </div>
  );
}
