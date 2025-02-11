import { useEffect, useRef, useState } from "react";
import getTags from "services/tagsServices/getTags";

const useAdFormDetails = ({ setValues }) => {
  const [tagIdInputs, setTagIdInputs] = useState("permittedTagIds");
  const [videoDuration, setVideoDuration] = useState(0);
  const [tagsList, setTagsList] = useState([]);
  const dropdownRef = useRef();

  const handleDateChange = (newStartDate) => {
    setValues((values) => ({
      ...values,
      startDate: newStartDate,
      expirationDate: "",
    }));
  };

  useEffect(() => {
    (async () => {
      const tagsData = await getTags();
      setTagsList(tagsData);
    })();
  }, []);

  return {
    tagIdInputs,
    setTagIdInputs,
    videoDuration,
    setVideoDuration,
    tagsList,
    handleDateChange,
    dropdownRef,
  };
};

export default useAdFormDetails;
