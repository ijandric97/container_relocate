import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../../redux/Store';
import { SettingsTypes } from '../../redux/reducers/SettingsReducer';
import { strings } from '../../util/language';

import BritishFlag from './images/BritishFlag.png';
import CroatianFlag from './images/CroatianFlag.png';
import GermanFlag from './images/GermanFlag.png';

import './SettingsPage.css';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { animation_duration, language } = useSelector((state: GlobalState) => state.settings);

  const flagClicked = (country: string) => {
    if (country !== language) {
      localStorage.setItem('language', country);
      dispatch({ type: SettingsTypes.Language, payload: country });
    }
  };

  const sliderChange = (event: any) => {
    localStorage.setItem('duration', event.target.value);
    dispatch({ type: SettingsTypes.AnimationDuration, payload: event.target.value });
  };

  return (
    <motion.div animate={{ opacity: 1 }} transition={{ duration: 1 }} className="settings">
      <h1>{strings[language].settingspage.language}</h1>
      <div className="flex">
        <div className={`item ${language !== 'hr' ? 'active' : ''}`} onClick={() => flagClicked('hr')}>
          <img src={CroatianFlag} alt={strings[language].settingspage.alt[0]} />
        </div>
        <div className={`item ${language !== 'en' ? 'active' : ''}`} onClick={() => flagClicked('en')}>
          <img src={BritishFlag} alt={strings[language].settingspage.alt[1]} />
        </div>
        <div className={`item ${language !== 'de' ? 'active' : ''}`} onClick={() => flagClicked('de')}>
          <img src={GermanFlag} alt={strings[language].settingspage.alt[2]} />
        </div>
      </div>
      <h1>{strings[language].settingspage.speed[0]}</h1>
      <p>{strings[language].settingspage.speed[1] + (1 / animation_duration).toFixed(1)}x</p>
      <div className="animation">
        <p>{strings[language].settingspage.slider[0]}</p>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={animation_duration}
          className="slider"
          onChange={sliderChange}
        />
        <p>{strings[language].settingspage.slider[1]}</p>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
