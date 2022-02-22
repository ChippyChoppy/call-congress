import { useState, useEffect } from 'react'
import apiCall from '../apis/callCongress'
import Header from './Header'
import IndividualInfo from './IndividualInfo'
import SearchContainer from './SearchContainer'
import styled from 'styled-components'

function App() {
  const [renderSearchButton, setRenderSearchButton] = useState(true)
  const [senators, setSenators] = useState([])
  const [reps, setReps] = useState([])
  const [selectedSen, setSelectedSen] = useState([])
  const [selectedRep, setSelectedRep] = useState([])

  useEffect(() => {
    apiCall
      .get('/senate/members.json')
      .then((res) => {
        setSenators(res.data.results[0].members)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    apiCall
      .get('/house/members.json')
      .then((res) => {
        setReps(res.data.results[0].members)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // function renderIndivResults() {
  //   if(selectedSen) {
  //     return <IndividualInfo selectedCon={selectedSen} />
  //   } else if(selectedRep) {
  //     return <IndividualInfo selectedCon={selectedRep} />
  //   }
  // }

  // onTermSubmit = async (term) => {
  //   const response = await callCongress.get('/senate/members.json')
  //   .then
  // }
function setCon() {
  // console.log(selectedSen, selectedRep)
  if(selectedSen.length !== 0) {
    console.log(selectedSen)
    return selectedSen
  } else if(selectedRep.length !== 0) {
    console.log(selectedRep)
    return selectedRep
  }
}

  return (
    <Page>
      <Header
        renderSearchButton={renderSearchButton}
        setRenderSearchButton={setRenderSearchButton}
      />
      {senators && reps  ? <>
      <SearchContainer
        setSelectedSen={setSelectedSen}
        senators={senators}
        setSelectedRep={setSelectedRep}
        reps={reps}
        selectedSen={selectedSen}
        selectedRep={selectedRep}
        param="last_name"
      />
      </> : <div>Please hold....</div> }

      {selectedSen.length || selectedRep.length ? <IndividualInfo selectedCon={setCon()}/> : null }
 
    </Page>
  )
}

export default App

const Page = styled.div`
  margin: 50px;
`