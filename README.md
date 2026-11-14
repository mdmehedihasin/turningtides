<p align="center">
  <img src="brand/icon-192.png" width="96" alt="TurningTides logo">
</p>

<h1 align="center">TurningTides · জমির ডাক্তার</h1>

<p align="center">
  <b>Every union. Every crop. Any phone.</b><br>
  A Bangla and English land, crop and weather adviser for every union of Bangladesh, built on NASA Earth data.<br><br>
  <a href="https://turningtides.vercel.app"><b>▶ Open the live app</b></a>
</p>

---

## The problem
A Bangladeshi farmer decides what to plant with little more than memory and luck. A flash flood, a salty field or a cold spell can wipe out a season and push the family into debt. The satellite data that could warn them exists, but it is scattered, technical and in English.

## What TurningTides does
Pick any of **5,160 unions** and any of **44 crops**, and ask: *"Can I grow ___ here?"* (এখানে কি ___ হবে?).
The answer comes first, in big words with a traffic-light colour: **yes**, **careful** or **no**. Below it:
- **why**, with a source and a confidence badge on every number
- **when to plant**, on the Bangla calendar, and **which variety**
- the risks, and better crops to grow instead
- a **7-day work calendar** from the weather forecast
- **the region's big danger, watched**:
  - **Harvest Race**: flash floods in the haor
  - **Flush Clock**: salt in the coastal polders
  - **Cold Shield**: cold and fog in the north
  - **Smart Water**: irrigation in the Barind
  - **Tide and Storm Watch**, **Slope Guard** and **Flowering Heat Shield**

## Who it reaches
- **Smartphones:** the full app, with a 3D satellite **Atlas** of the whole country down to your own plot.
- **Cheap phones:** a light version that still works offline after the first visit.
- **Keypad phones:** one SMS, e.g. `JOMI 73043 ALU` (land · union code · potato), gets the same answer. *(Simulator today; a live SMS line is next.)*
- **No phone:** a printed **Land Card** for the wall or the Union Digital Centre.
- **Agriculture officers:** an Officer view across unions and upazilas.

## Proof, not promises
The Harvest Race replays past flash floods day by day: hill rain on one side, radar-seen water in the haor on the other.
- **2017 (historical hindcast):** rain on the Meghalaya hills crossed the warning line (165 mm in 3 days) on **31 Mar**. Water reached the Sunamganj haor on **7 Apr**, which would have given **7 days' warning**.
- **Across five early floods** (2015, 2016, 2017, 2019, 2022), it warned in time in **3 of 5**. The two misses are shown in the app, not hidden.

Every value is observed, computed, or published and cited. Mock-ups are labelled **EXAMPLE**. Forecasts show probability, never certainty. The **How we know** screen shows the sources, assumptions and test results. A human backup is always one call away: Krishi Call Centre **16123**.

## Data
NASA Earth data, including **GPM IMERG** (rain), **NASA POWER** (weather), **SMAP** (soil moisture), **NASADEM** (land height), **Landsat / HLS**, **MODIS** and **MERRA-2**. Alongside them, open partner data:
- Copernicus **Sentinel-1** radar (water under the clouds)
- ISRIC **SoilGrids**
- **JRC Global Surface Water**
- **ESA WorldCover**
- Bangladesh government publications (BRRI, BARI, BBS, BAMIS)

The full list with licences and credits is in [`NOTICE.md`](NOTICE.md).

## How it works
- A Python pipeline turns the satellite and weather data into a small static data bundle, one file per union.
- The web app (Preact + TypeScript, MapLibre and Three.js for the 3D Atlas) reads that bundle. There is no server.
- It installs as an app (PWA) and keeps working offline.
- It is Bangla-first, with an English switch, a read-aloud button and the Bangla calendar months.

This repository holds the **published build** of the app. To run it locally, serve the folder with any static server:
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Limits
- It is advice from satellite and weather data, **not a soil test**. Check locally with your Sub-Assistant Agriculture Officer.
- The 2017 result is a **replay of past data**, not a live forecast.
- Field tests with farmers come next.

## NASA Space Apps Challenge 2026
Challenge: **Field Shift: Adapting Farms with NASA Data**

**Team DeltaX**, Dhaka, Bangladesh:
- Md. Mehedi Hasin Anjum (Team Lead)
- Samin Yasar Siddiqui
- Itminanul Bari

## Licence
Code and original content: Apache License 2.0 ([`LICENSE.txt`](LICENSE.txt)). Data, imagery and fonts keep their own licences ([`NOTICE.md`](NOTICE.md)). NASA does not endorse this project.
