import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';


export default class FloatingLabel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hasValue: false, hasError: false};
        this._bind('onBlur', 'onChange');
    }

    _bind(...methods) {
        methods.map(method => this[method] = this[method].bind(this));
    }

    onBlur(event) {
        this.setState({hasValue: Boolean(event.currentTarget.value)});
    }

    onChange(event) {
        const {pattern} = this.props;
        this.setState({
            hasError: !pattern.test(event.currentTarget.value),
            hasValue: Boolean(event.currentTarget.value)
        });
    }

    render() {
        const {autoComplete, errorMsg, id, isDisabled, pattern, placeholder, type} = this.props;
        const {hasValue, hasError} = this.state;

        const inputClasses = classNames('fl-input', {'fl-valid': hasValue && !hasError}, {'fl-invalid': hasValue && hasError});
        const errMsgClasses = classNames({'fl-error-msg': errorMsg}, {'fl-error-show': (hasError && hasValue) && (errorMsg && pattern)});

        return (
            <div className='fl-input-container'>
                <input
                    autoComplete={autoComplete}
                    className={inputClasses}
                    disabled={isDisabled}
                    id={id}
                    onBlur={this.onBlur}
                    onChange={pattern ? this.onChange : null}
                    type={type} />
                <label className='fl-input-label' htmlFor={id}>{placeholder}</label>
                <span className='fl-input-bar' />
                {errorMsg && <span className={errMsgClasses}>{errorMsg}</span>}
            </div>
        );
    }
}

FloatingLabel.propTypes = {
    autoComplete: PropTypes.bool,
    errorMsg: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    pattern: PropTypes.any,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool
};

FloatingLabel.defaultProps = {
    autoComplete: false,
    type: 'text',
    isDisabled: false,
    id: 'text-box',
    placeholder: 'name'
};


module.exports = FloatingLabel;

//TODO: remove below lines
const target = document.getElementById('content');
ReactDOM.render(<FloatingLabel
        errorMsg='Full name can contain only the alphabets and space'
        pattern={/^[a-z\s]+$/i}
    />,
    target);

