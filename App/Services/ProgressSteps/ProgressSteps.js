import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { times } from 'lodash';
import PropTypes from 'prop-types';
import StepIcon from './StepIcon';

class ProgressSteps extends Component {
  state = {
    stepCount: 0,
    activeStep: this.props.activeStep,
  };

  componentDidMount() {
    this.setState({ stepCount: React.Children.count(this.props.children) });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeStep !== this.props.activeStep) {
      this.setActiveStep(this.props.activeStep);
    }
  }

  getChildProps() {
    return { ...this.props, ...this.state };
  }

  renderStepIcons = () => {
    let step = [];

    times(this.state.stepCount, (i) => {
      const isCompletedStep = this.props.isComplete ? true : i < this.state.activeStep;

      const isActiveStep = this.props.isComplete ? false : i === this.state.activeStep;

      step.push(
        <View key={i}>
          <View>
            <StepIcon
              {...this.getChildProps()}
              stepNum={i + 1}
              label={this.props.children[i].props.label}
              isFirstStep={i === 0}
              isLastStep={i === this.state.stepCount - 1}
              isCompletedStep={isCompletedStep}
              isActiveStep={isActiveStep}
            />
          </View>
        </View>
      );
    });

    return step;
  };

  // Callback function from ProgressStep that passes current step.
  setActiveStep = (step) => {
    // Guard against setting current step higher than total step count.
    if (step >= this.state.stepCount - 1) {
      this.setState({ activeStep: this.state.stepCount - 1 });
    }

    if (step > -1 && step < this.state.stepCount - 1) {
      this.setState({ activeStep: step });
    }
  };

  render() {
    const styles = {
      stepIcons: {
        // position: 'relative',
        borderBottomLeftRadius: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        maxHeight: 80,
        top: 30,
        marginBottom: 50,
      },
    };

    return (
      <ScrollView style={{ flex: 1 }}>
        <ScrollView
          horizontal={true}
          style={styles.stepIcons}
          showsHorizontalScrollIndicator={false}
        >
          {this.renderStepIcons()}
        </ScrollView>
        <View style={{ flex: 1 }}>
          {React.cloneElement(this.props.children[this.state.activeStep], {
            setActiveStep: this.setActiveStep,
            activeStep: this.state.activeStep,
            stepCount: this.state.stepCount,
          })}
        </View>
      </ScrollView>
    );
  }
}

ProgressSteps.propTypes = {
  isComplete: PropTypes.bool,
  activeStep: PropTypes.number,
};

ProgressSteps.defaultProps = {
  isComplete: false,
  activeStep: 0,
};

export default ProgressSteps;
