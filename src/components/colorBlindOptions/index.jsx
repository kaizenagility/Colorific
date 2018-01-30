import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chroma from 'chroma-js';
import blind from 'color-blind';
import { setColorBlind } from 'actions/colors';
import {
  blindSettings,
  blindTypes
} from 'utils/blindSettings';
import style from './style.css';

class ColorBlindOptions extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    blindness: PropTypes.string.isRequired,
    setColorBlind: PropTypes.func.isRequired,
    setting: PropTypes.string,
  }

  render() {
    const {
      blindness,
      setting,
      background
    } = this.props;

    let containerBackground = chroma(background);
    if (blindness !== 'common') {
      const modifier = blind[setting];
      containerBackground = modifier(background)
    }
    const previewColor = containerBackground;

    containerBackground = chroma(containerBackground).darken(1);
    const secondRowColor = chroma(containerBackground).brighten(0.5);

    const lums = chroma(containerBackground).luminance();
    const isDark = lums <= 0.5;

    return (
      <div
        className={style.container}
        style={{
          color: isDark ? '#fff' : '#000',
          backgroundColor: containerBackground,
        }}>
        <div
          arial-labelledby='color-perception'
          role='group'
          className={style.blindTypes}
          >
          <b
            className={style.blindLabel}
            id='color-perception'
            role='heading'
            >
            Color Perception
          </b>
          {blindTypes.map((type) => {
            return (
              <label
                key={type}
                className={style.blindOption}>
                <input
                  type='radio'
                  name='blind_type'
                  value={type}
                  checked={type === blindness}
                  onChange={(e) => {
                    this.props.setColorBlind(e.target.value, blindSettings[e.target.value] ? blindSettings[e.target.value][0] : null)
                  }}/>
                <span>{type}</span>
                <Triangle
                  className={style.triangle}
                  fill={type === 'common' ? previewColor : secondRowColor}
                  />
              </label>
            );
          })}
        </div>
        {blindSettings[blindness] && (
          <div
            aria-labelledby='blindness-perception'
            role='group'
            className={style.blindTypes}
            style={{
              backgroundColor: secondRowColor,
              color: chroma(secondRowColor).luminance() <= 0.5 ? '#fff' : '#000'
            }}>
            <b
              className={style.blindLabel}
              id='blindness-perception'
              role='heading'
              >
              Blindness
            </b>
            {blindSettings[blindness].map((type) => {
              return (
                <label
                  key={type}
                  className={style.blindOption}
                  >
                  <input
                    type='radio'
                    name='blind_setting'
                    value={type}
                    checked={type === setting}
                    onChange={(e) => {
                      this.props.setColorBlind(blindness, e.target.value);
                    }}/>
                  <span>{type}</span>
                  <Triangle
                    className={style.triangle}
                    fill={previewColor}
                    />
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

class Triangle extends Component {
  static propTypes = {
    fill: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    className: PropTypes.string,
  }

  static defaultProps = {
    fill: '#ffffff',
  }

  render() {
    const {
      fill,
      className,
    } = this.props;

    return (
      <svg
        className={className}
        width='6'
        height='4'
        viewBox='0 0 6 4'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          fill={fill}
          d='M3 0l3 4H0'
          fillRule='evenodd'/>
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return {
    background: state.colors.background,
    blindness: state.colors.blindness,
    setting: state.colors.setting
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setColorBlind: (blindness, setting) => {
      dispatch(setColorBlind(blindness, setting));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorBlindOptions);