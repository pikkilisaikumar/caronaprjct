import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ContainerOne from './styledComponent'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './App.css'

const apiStatusChange = {
  intial: 'INTIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class App extends Component {
  state = {
    search: 'randomdata',
    countryList: [],
    apiStatus: apiStatusChange.intial,
  }

  componentDidMount() {
    this.getDetails()
  }

  searchCity = event => {
    this.setState({search: event.target.value})
  }

  press = event => {
    const {search} = this.state
    if (event.key === 'Enter') {
      localStorage.setItem('city', search)
      this.setState({search}, this.getDetails)
    }
  }

  getDetails = async () => {
    const cityname = localStorage.getItem('city')
    this.setState({apiStatus: apiStatusChange.loading})

    const url = `https://disease.sh/v3/covid-19/countries/${cityname}`
    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      this.setState({
        countryList: data,
        search: '',
        apiStatus: apiStatusChange.success,
      })
    } else if (response.status === 404) {
      this.setState({apiStatus: apiStatusChange.failure, search: ''})
    }
  }

  renderSuccess = () => {
    const {search, countryList} = this.state

    const {
      active,
      cases,
      continent,
      country,
      countryInfo,
      critical,
      deaths,
      recovered,
      todayCases,
      todayDeaths,
      todayRecovered,
    } = countryList
    const {flag} = countryInfo

    return (
      <ContainerOne bgimage={flag}>
        <div className="background1">
          <p>Check The Carona Details</p>
          <input
            type="text"
            value={search}
            className="input"
            onChange={this.searchCity}
            onKeyPress={this.press}
            placeholder="Enter the country name"
          />
          <p className="continent-paragraph">
            Continent :-<span className="special-styling">{continent}</span>
          </p>
          <h1 className="countryname-heading">{country}</h1>
          <div className="containeractive-case">
            <p className="active-case">
              Active :-<span className="special-styling">{active}</span>
            </p>
            <p className="styling-paragraph">
              Cases :-<span className="special-styling">{cases}</span>
            </p>
          </div>
          <div className="containeractive-case">
            <p className="active-case">
              Deaths :-<span className="special-styling">{deaths}</span>
            </p>
            <p className="styling-paragraph">
              Recovered :-<span className="special-styling">{recovered}</span>
            </p>
          </div>
          <div className="containeractive-case">
            <p className="active-case">
              Critical :-<span className="special-styling">{critical}</span>
            </p>
          </div>
          <h1 className="countryname-heading">Todays update</h1>
          <div className="containeractive-case">
            <p className="active-case">
              todayCases :-<span className="special-styling">{todayCases}</span>
            </p>
            <p className="styling-paragraph">
              todayDeaths :-
              <span className="special-styling">{todayDeaths}</span>
            </p>
          </div>
          <p className="styling-paragraph">
            todayRecovered :-
            <span className="special-styling">{todayRecovered}</span>
          </p>
        </div>
      </ContainerOne>
    )
  }

  renderFailure = () => {
    const {search} = this.state
    return (
      <div className="background">
        <div className="background1">
          <p>Check The Carona Details</p>
          <input
            type="text"
            value={search}
            className="input"
            onChange={this.searchCity}
            onKeyPress={this.press}
            placeholder="Enter the country name"
          />
          <h1>Country is not Found</h1>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div className="background">
      <div className="background2">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusChange.success:
        return this.renderSuccess()
      case apiStatusChange.failure:
        return this.renderFailure()
      case apiStatusChange.loading:
        return this.renderLoading()
      default:
        return null
    }
  }
}

export default App
