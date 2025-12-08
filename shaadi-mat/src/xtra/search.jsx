import { useState } from "react";
import { Link } from "react-router-dom";
import profiles from "../data/profiles";
import {
  Slider,
  Box,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { IoHeartSharp } from "react-icons/io5";

const maritalOptions = ["Single", "Married", "Divorced", "Widowed"];
const religionOptions = ["Christianity", "Islam", "Hinduism", "Buddhism"];
const casteOptions = ["General", "OBC", "SC", "ST"];
const countryOptions = ["USA", "India", "UK", "Canada"];
const employmentOptions = ["Employed", "Unemployed", "Self-employed"];
const stateOptions = ["California", "New York", "Texas", "Florida"];
const motherTongueOptions = ["English", "Hindi", "Spanish", "French"];
const occupationOptions = ["Engineer", "Doctor", "Teacher", "Business"];

const formatHeight = (inches) => {
  const feet = Math.floor(inches / 12);
  const inch = inches % 12;
  return `${feet}'${inch}\"`;
};



export default function Search() {
  const [selectedMarital, setSelectedMarital] = useState(null);
  const [selectedReligion, setSelectedReligion] = useState(null);
  const [selectedCaste, setSelectedCaste] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [Age, setAge] = useState([18, 60]);
  const [heightRange, setHeightRange] = useState([48, 84]);
  const [selectedEmployment, setSelectedEmployment] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedMotherTongue, setSelectedMotherTongue] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [salary, setSalary] = useState(50000);
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  const handleChange = (setter) => (event, newValue) => {
    setter(newValue);
  };

  const handleSearch = () => {
    const filtered = profiles.filter((profile) => {
      const ageInRange = profile.age >= Age[0] && profile.age <= Age[1];
      const heightInRange =
        profile.height >= heightRange[0] && profile.height <= heightRange[1];
      const maritalMatch =
        !selectedMarital || profile.maritalStatus === selectedMarital;
      const religionMatch =
        !selectedReligion || profile.religion === selectedReligion;
      const casteMatch = !selectedCaste || profile.caste === selectedCaste;
      const countryMatch =
        !selectedCountry || profile.country === selectedCountry;
      const employmentMatch =
        !selectedEmployment || profile.employment === selectedEmployment;
      const stateMatch = !selectedState || profile.state === selectedState;
      const motherTongueMatch =
        !selectedMotherTongue || profile.motherTongue === selectedMotherTongue;
      const occupationMatch =
        !selectedOccupation || profile.occupation === selectedOccupation;
      const salaryMatch = profile.salary >= salary;

      return (
        ageInRange &&
        heightInRange &&
        maritalMatch &&
        religionMatch &&
        casteMatch &&
        countryMatch &&
        employmentMatch &&
        stateMatch &&
        motherTongueMatch &&
        occupationMatch &&
        salaryMatch
      );
    });

    setFilteredProfiles(filtered);
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center items-center bg-gray-100">
      <div className="w-[95%] bg-white p-3 rounded-xl shadow-lg h-[170px] overflow-hidden">
        <h1 className="text-lg font-semibold mb-2">Filters</h1>
        <div className="grid grid-cols-6 px-auto  grid-rows-2 gap-6 text-sm">
          {/* Sliders */}
          <Box className="col-span-1">
            <Typography variant="body2">
              Age: {Age[0]} - {Age[1]}
            </Typography>
            <Slider
              value={Age}
              onChange={handleChange(setAge)}
              min={18}
              max={60}
              size="small"
            />
          </Box>
          <Box className="col-span-1">
            <Typography variant="body2">
              Height: {formatHeight(heightRange[0])} -{" "}
              {formatHeight(heightRange[1])}
            </Typography>
            <Slider
              value={heightRange}
              onChange={handleChange(setHeightRange)}
              min={48}
              max={84}
              size="small"
            />
          </Box>

          {[
            [
              "Marital Option",
              maritalOptions,
              selectedMarital,
              setSelectedMarital,
            ],
            [
              "Religion",
              religionOptions,
              selectedReligion,
              setSelectedReligion,
            ],
            ["Caste", casteOptions, selectedCaste, setSelectedCaste],
            ["Country", countryOptions, selectedCountry, setSelectedCountry],
            [
              "Employment",
              employmentOptions,
              selectedEmployment,
              setSelectedEmployment,
            ],
            ["State", stateOptions, selectedState, setSelectedState],
            [
              "Mother Tongue",
              motherTongueOptions,
              selectedMotherTongue,
              setSelectedMotherTongue,
            ],
            [
              "Occupation",
              occupationOptions,
              selectedOccupation,
              setSelectedOccupation,
            ],
          ].map(([label, options, value, setValue]) => (
            <Autocomplete
              key={label}
              options={options}
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
              renderInput={(params) => (
                <TextField {...params} label={label} fullWidth size="small" />
              )}
            />
          ))}

          <TextField
            label="Salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            fullWidth
            size="small"
          />
          <div className="flex justify-center items-start">
            <button
              className="px-5 py-1 text-lg font-inter text-white rounded-lg bg-pink-500"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10 mt-6">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="h-[400px] w-[320px] flex flex-col rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex justify-between items-end  text-xl font-semibold w-full text-black font-playfair py-5 p-2 ">
              <IoHeartSharp className="text-3xl text-transparent stroke-black stroke-[40] -rotate-12" />
              <h1 className="font-Libre">ShaadiTamil</h1>
              <button className="px-2 rounded-full font-inter text-[15px] text-pink-600">
                {profile.maritalStatus}
              </button>
            </div>
            <hr />
            <div className="flex justify-center items-center py-2">
              <img
                src={profile.img}
                alt="1.img"
                className="h-[100px] w-[100px] bg-black rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center items-center font-inter text-center px-2 gap-1">
              <p className="font-bold">
                {profile.name}- {profile.occupation}
              </p>
              <p className="text-xs">
                {profile.state}, {profile.country}
              </p>
              <p>{profile.about}</p>
            </div>
            <div className="flex flex-col w-full justify-end  h-full">
            <hr/>
            </div>
            <div className="flex justify-between items-end p-5 font-inter text-white px-10 h-full">
              <button  className="px-2 py-1 bg-pink-700 rounded-sm">
                Send Request
              </button>
              <Link to={`/profiles/${profile.id}`}>
              <button className="px-2 py-1  bg-pink-700 rounded-sm">
                View Profie
              </button>
              </Link>
            </div>
          </div>
        ))}
        {filteredProfiles.length===0 && <div className="gap-5 min-h-[500px] w-full flex flex-col justify-center font-inter items-center">
            <h1 >No results found</h1>
            <button className="px-2 py-1  bg-pink-700 rounded-sm text-white">View more</button>
          </div>}
      </div>
    </div>
  );
}