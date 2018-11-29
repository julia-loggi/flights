export namespace ITabs {
  export interface Config {
    name: string;
    component: React.ComponentClass<TabProps | any>;
  }
  export type TabProps = {
    language: LanguageType;
    airportCode: AirportCode;
    date: ISOString;
  };
}

export type LanguageType = 'ru' | 'en';
export type LanguageRequsetType = 'ru_RU' | 'en_EN';

export type AirportCode = 's9600216' | 's9600215' | 's9600213';
export type EventType = 'arrival' | 'departure';
export type ISOString = string;
export interface Action {
  type?: string;
  data?: any;
  error?: any | null;
  [key: string]: any;
}

export interface ReduxState {
  language: ILanguage.State;
  flights: IFlights.State;
}

export namespace ILanguage {
  export interface State {
    selectedLanguage: LanguageType;
    dictionary: { [key: string]: string };
  }

  export type AC_Select = (value: LanguageType) => Action;
}

export namespace IFlights {
  export interface State {
    isFetching: boolean;
    isFetched: boolean;
    arrivals: Flights;
    departures: Flights;
    delays: Flights;
    error: Error | null;
  }

  export type Flights = {
    total: number;
    flights: Array<Flight>;
  };

  export type Flight = {
    arrival: ISOString | null;
    departure: ISOString | null;
    is_fuzzy: boolean;
    thread: {
      title: string; // маршрут
      uid: string;
      number: string; // номер рейса
      carrier: string; // название перевозчика
    };
  };

  export type Params = {
    airport: AirportCode;
    lang: LanguageType;
    offset: number;
    event?: EventType;
    date?: ISOString;
  };

  export type AC_Select = (airport: AirportCode) => Action;
  export type AC_Fetching = () => Action;
  export type AC_Fetch = (params: Params) => Action;
}
