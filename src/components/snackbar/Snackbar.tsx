import React from 'react'
import './Snackbar.css'

export type SnackbarVariant = 'success' | 'error'

interface SnackbarProps {
  variant: SnackbarVariant
  title: string
  message: string
  onClose?: () => void
}

const SnackbarIcon: React.FC<{ variant: SnackbarVariant }> = ({ variant }) => {
  const fillColor = variant === 'success' ? '#23A45A' : '#D9322A'

  return (
    <div className="snackbar__icon">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Success icon pattern - extracted from Figma */}
        {variant === 'success' && (
          <>
            <path d="M3.39062 0.0603027L0.951538 2.49938L3.39062 4.93846L5.8297 2.49938L3.39062 0.0603027Z" fill="#23A45A"/>
            <path d="M2.77929 0.0603027L0.34021 2.49938L2.77929 4.93846L5.21837 2.49938L2.77929 0.0603027Z" fill="#23A45A" transform="translate(5,0)"/>
            <path d="M3.17187 0.0603027L0.732788 2.49938L3.17187 4.93846L5.61095 2.49938L3.17187 0.0603027Z" fill="#23A45A" transform="translate(9,0)"/>
            <path d="M2.56249 0.0603027L0.123413 2.49938L2.56249 4.93846L5.00157 2.49938L2.56249 0.0603027Z" fill="#23A45A" transform="translate(14,0)"/>
            <path d="M2.95116 0.0603027L0.512085 2.49938L2.95116 4.93846L5.39024 2.49938L2.95116 0.0603027Z" fill="#23A45A" transform="translate(18,0)"/>
            <path d="M3.34191 0.0602112L0.902832 2.49929L3.34191 4.93837L5.78099 2.49929L3.34191 0.0602112Z" fill="#23A45A" transform="translate(22,0)"/>
            <path d="M2.73046 0.0603027L0.291382 2.49938L2.73046 4.93846L5.16954 2.49938L2.73046 0.0603027Z" fill="#23A45A" transform="translate(27,0)"/>
            
            <path d="M2.99996 0.450714L0.560883 2.88979L2.99996 5.32887L5.43904 2.88979L2.99996 0.450714Z" fill="#23A45A" transform="translate(0,4)"/>
            <path d="M2.39085 1.91437L1.41522 2.89L2.39085 3.86563L3.36649 2.89L2.39085 1.91437Z" fill="#23A45A" transform="translate(4,4)"/>
            <path d="M2.77953 1.91437L1.80389 2.89L2.77953 3.86563L3.75516 2.89L2.77953 1.91437Z" fill="#23A45A" transform="translate(9,4)"/>
            <path d="M2.1721 1.91437L1.19647 2.89L2.1721 3.86563L3.14774 2.89L2.1721 1.91437Z" fill="#23A45A" transform="translate(13,4)"/>
            <path d="M2.56273 1.91437L1.5871 2.89L2.56273 3.86563L3.53836 2.89L2.56273 1.91437Z" fill="#23A45A" transform="translate(18,4)"/>
            <path d="M2.9514 1.91437L1.97577 2.89L2.9514 3.86563L3.92703 2.89L2.9514 1.91437Z" fill="#23A45A" transform="translate(22,4)"/>
            <path d="M2.34215 1.9144L1.36652 2.89003L2.34215 3.86566L3.31778 2.89003L2.34215 1.9144Z" fill="#23A45A" transform="translate(26,4)"/>
            <path d="M2.7307 1.91437L1.75507 2.89L2.7307 3.86563L3.70633 2.89L2.7307 1.91437Z" fill="#23A45A" transform="translate(31,4)"/>
            <path d="M3.12109 0.450684L0.682007 2.88976L3.12109 5.32884L5.56016 2.88976L3.12109 0.450684Z" fill="#23A45A" transform="translate(35,4)"/>
            
            <path d="M2.99996 0.840942L0.560883 3.28002L2.99996 5.7191L5.43904 3.28002L2.99996 0.840942Z" fill="#23A45A" transform="translate(0,9)"/>
            <path d="M2.39085 1.30475L1.41522 2.28038L2.39085 3.25601L3.36649 2.28038L2.39085 1.30475Z" fill="#23A45A" transform="translate(4,9)"/>
            <path d="M2.7307 1.30475L1.75507 2.28038L2.7307 3.25601L3.70633 2.28038L2.7307 1.30475Z" fill="#23A45A" transform="translate(31,9)"/>
            <path d="M3.12109 0.841064L0.682007 3.28014L3.12109 5.71922L5.56016 3.28014L3.12109 0.841064Z" fill="#23A45A" transform="translate(35,9)"/>
            
            <path d="M2.99996 0.231476L0.560883 2.67055L2.99996 5.10963L5.43904 2.67056L2.99996 0.231476Z" fill="#23A45A" transform="translate(0,13)"/>
            <path d="M2.39085 1.69513L1.41522 2.67076L2.39085 3.64639L3.36649 2.67076L2.39085 1.69513Z" fill="#23A45A" transform="translate(4,13)"/>
            <path d="M2.9514 1.69513L1.97577 2.67076L2.9514 3.64639L3.92703 2.67076L2.9514 1.69513Z" fill="#23A45A" transform="translate(22,13)"/>
            <path d="M3.34191 0.231476L0.902832 2.67055L3.34191 5.10963L5.78099 2.67056L3.34191 0.231476Z" fill="#23A45A" transform="translate(26,13)"/>
            <path d="M2.7307 1.69513L1.75507 2.67076L2.7307 3.64639L3.70633 2.67076L2.7307 1.69513Z" fill="#23A45A" transform="translate(31,13)"/>
            <path d="M3.12109 0.231445L0.682007 2.67052L3.12109 5.1096L5.56016 2.67052L3.12109 0.231445Z" fill="#23A45A" transform="translate(35,13)"/>
            
            <path d="M2.99996 0.621704L0.560883 3.06078L2.99996 5.49986L5.43904 3.06078L2.99996 0.621704Z" fill="#23A45A" transform="translate(0,18)"/>
            <path d="M2.39085 1.08527L1.41522 2.0609L2.39085 3.03653L3.36649 2.0609L2.39085 1.08527Z" fill="#23A45A" transform="translate(4,18)"/>
            <path d="M3.17187 0.621582L0.732788 3.06066L3.17187 5.49974L5.61095 3.06066L3.17187 0.621582Z" fill="#23A45A" transform="translate(13,18)"/>
            <path d="M2.56273 1.08527L1.5871 2.0609L2.56273 3.03653L3.53836 2.0609L2.56273 1.08527Z" fill="#23A45A" transform="translate(18,18)"/>
            <path d="M2.95116 0.621582L0.512085 3.06066L2.95116 5.49974L5.39024 3.06066L2.95116 0.621582Z" fill="#23A45A" transform="translate(22,18)"/>
            <path d="M2.7307 1.08527L1.75507 2.0609L2.7307 3.03653L3.70633 2.0609L2.7307 1.08527Z" fill="#23A45A" transform="translate(31,18)"/>
            <path d="M3.12109 0.621582L0.682007 3.06066L3.12109 5.49974L5.56016 3.06066L3.12109 0.621582Z" fill="#23A45A" transform="translate(35,18)"/>
            
            <path d="M2.99996 0.012207L0.560883 2.45129L2.99996 4.89036L5.43904 2.45129L2.99996 0.012207Z" fill="#23A45A" transform="translate(0,22)"/>
            <path d="M2.39085 1.47589L1.41522 2.45152L2.39085 3.42715L3.36649 2.45152L2.39085 1.47589Z" fill="#23A45A" transform="translate(4,22)"/>
            <path d="M2.56249 0.012207L0.123413 2.45129L2.56249 4.89036L5.00157 2.45129L2.56249 0.012207Z" fill="#23A45A" transform="translate(18,22)"/>
            <path d="M2.7307 1.47589L1.75507 2.45152L2.7307 3.42715L3.70633 2.45152L2.7307 1.47589Z" fill="#23A45A" transform="translate(31,22)"/>
            <path d="M3.12109 0.012207L0.682007 2.45129L3.12109 4.89036L5.56016 2.45129L3.12109 0.012207Z" fill="#23A45A" transform="translate(35,22)"/>
            
            <path d="M3.39062 0.402344L0.951538 2.84142L3.39062 5.2805L5.8297 2.84142L3.39062 0.402344Z" fill="#23A45A" transform="translate(4,26)"/>
            <path d="M2.77953 1.86603L1.80389 2.84166L2.77953 3.81729L3.75516 2.84166L2.77953 1.86603Z" fill="#23A45A" transform="translate(9,26)"/>
            <path d="M2.34215 1.86612L1.36652 2.84175L2.34215 3.81738L3.31778 2.84175L2.34215 1.86612Z" fill="#23A45A" transform="translate(26,26)"/>
            <path d="M2.73046 0.402344L0.291382 2.84142L2.73046 5.2805L5.16954 2.84142L2.73046 0.402344Z" fill="#23A45A" transform="translate(31,26)"/>
            
            <path d="M2.77929 0.792725L0.34021 3.2318L2.77929 5.67088L5.21837 3.2318L2.77929 0.792725Z" fill="#23A45A" transform="translate(9,31)"/>
            <path d="M2.1721 1.25641L1.19647 2.23204L2.1721 3.20767L3.14774 2.23204L2.1721 1.25641Z" fill="#23A45A" transform="translate(13,31)"/>
            <path d="M2.9514 1.25641L1.97577 2.23204L2.9514 3.20767L3.92703 2.23204L2.9514 1.25641Z" fill="#23A45A" transform="translate(22,31)"/>
            <path d="M3.34191 0.792664L0.902832 3.23174L3.34191 5.67082L5.78099 3.23174L3.34191 0.792664Z" fill="#23A45A" transform="translate(26,31)"/>
            
            <path d="M3.17187 0.183105L0.732788 2.62218L3.17187 5.06126L5.61095 2.62218L3.17187 0.183105Z" fill="#23A45A" transform="translate(13,35)"/>
            <path d="M2.56249 0.183105L0.123413 2.62218L2.56249 5.06126L5.00157 2.62218L2.56249 0.183105Z" fill="#23A45A" transform="translate(18,35)"/>
            <path d="M2.95116 0.183105L0.512085 2.62218L2.95116 5.06126L5.39024 2.62218L2.95116 0.183105Z" fill="#23A45A" transform="translate(22,35)"/>
          </>
        )}
        
        {/* Error icon pattern - extracted from Figma */}
        {variant === 'error' && (
          <>
            <path d="M2.78048 0.0609741L0.341461 2.5L2.78049 4.93902L5.21951 2.5L2.78048 0.0609741Z" fill="#D9322A" transform="translate(5,0)"/>
            <path d="M3.17074 0.0609741L0.73172 2.5L3.17074 4.93902L5.60977 2.5L3.17074 0.0609741Z" fill="#D9322A" transform="translate(9,0)"/>
            <path d="M2.56097 0.0609741L0.121948 2.5L2.56097 4.93902L5 2.5L2.56097 0.0609741Z" fill="#D9322A" transform="translate(14,0)"/>
            <path d="M2.95123 0.0609741L0.512207 2.5L2.95123 4.93902L5.39026 2.5L2.95123 0.0609741Z" fill="#D9322A" transform="translate(18,0)"/>
            <path d="M3.34146 0.0609741L0.902435 2.5L3.34146 4.93902L5.78048 2.5L3.34146 0.0609741Z" fill="#D9322A" transform="translate(22,0)"/>
            
            <path d="M3.39026 0.451218L0.951233 2.89024L3.39026 5.32927L5.82928 2.89024L3.39026 0.451218Z" fill="#D9322A" transform="translate(0,4)"/>
            <path d="M2.78072 1.91487L1.80511 2.89048L2.78072 3.86609L3.75633 2.89048L2.78072 1.91487Z" fill="#D9322A" transform="translate(5,4)"/>
            <path d="M2.17098 1.91487L1.19537 2.89048L2.17098 3.86609L3.14659 2.89048L2.17098 1.91487Z" fill="#D9322A" transform="translate(9,4)"/>
            <path d="M2.56121 1.91487L1.5856 2.89048L2.56121 3.86609L3.53682 2.89048L2.56121 1.91487Z" fill="#D9322A" transform="translate(14,4)"/>
            <path d="M2.95147 1.91487L1.97586 2.89048L2.95147 3.86609L3.92708 2.89048L2.95147 1.91487Z" fill="#D9322A" transform="translate(18,4)"/>
            <path d="M2.3417 1.91487L1.36609 2.89048L2.3417 3.86609L3.31731 2.89048L2.3417 1.91487Z" fill="#D9322A" transform="translate(22,4)"/>
            <path d="M2.73172 0.451218L0.292694 2.89024L2.73172 5.32927L5.17074 2.89024L2.73172 0.451218Z" fill="#D9322A" transform="translate(27,4)"/>
            
            <path d="M3 0.841461L0.560974 3.28048L3 5.71951L5.43902 3.28049L3 0.841461Z" fill="#D9322A" transform="translate(0,9)"/>
            <path d="M2.3905 1.30511L1.41489 2.28072L2.3905 3.25633L3.36611 2.28072L2.3905 1.30511Z" fill="#D9322A" transform="translate(0,9)"/>
            <path d="M2.73196 1.30511L1.75635 2.28072L2.73196 3.25633L3.70757 2.28072L2.73196 1.30511Z" fill="#D9322A" transform="translate(27,9)"/>
            <path d="M3.12195 0.841461L0.682922 3.28048L3.12195 5.71951L5.56097 3.28049L3.12195 0.841461Z" fill="#D9322A" transform="translate(31,9)"/>
            
            <path d="M3 0.231705L0.560974 2.67073L3 5.10975L5.43902 2.67073L3 0.231705Z" fill="#D9322A" transform="translate(0,13)"/>
            <path d="M2.3905 1.69536L1.41489 2.67097L2.3905 3.64658L3.36611 2.67097L2.3905 1.69536Z" fill="#D9322A" transform="translate(0,13)"/>
            <path d="M2.73196 1.69536L1.75635 2.67097L2.73196 3.64658L3.70757 2.67097L2.73196 1.69536Z" fill="#D9322A" transform="translate(27,13)"/>
            <path d="M3.12195 0.231705L0.682922 2.67073L3.12195 5.10975L5.56097 2.67073L3.12195 0.231705Z" fill="#D9322A" transform="translate(31,13)"/>
            
            <path d="M3 0.621948L0.560974 3.06097L3 5.5L5.43902 3.06097L3 0.621948Z" fill="#D9322A" transform="translate(0,18)"/>
            <path d="M2.3905 1.0856L1.41489 2.06121L2.3905 3.03682L3.36611 2.06121L2.3905 1.0856Z" fill="#D9322A" transform="translate(0,18)"/>
            <path d="M2.78048 0.621948L0.341461 3.06097L2.78049 5.5L5.21951 3.06097L2.78048 0.621948Z" fill="#D9322A" transform="translate(5,18)"/>
            <path d="M3.17074 0.621948L0.73172 3.06097L3.17074 5.5L5.60977 3.06097L3.17074 0.621948Z" fill="#D9322A" transform="translate(9,18)"/>
            <path d="M2.56097 0.621948L0.121948 3.06097L2.56097 5.5L5 3.06097L2.56097 0.621948Z" fill="#D9322A" transform="translate(14,18)"/>
            <path d="M2.95123 0.621948L0.512207 3.06097L2.95123 5.5L5.39026 3.06097L2.95123 0.621948Z" fill="#D9322A" transform="translate(18,18)"/>
            <path d="M3.34146 0.621948L0.902435 3.06097L3.34146 5.5L5.78048 3.06097L3.34146 0.621948Z" fill="#D9322A" transform="translate(22,18)"/>
            <path d="M2.73196 1.0856L1.75635 2.06121L2.73196 3.03682L3.70757 2.06121L2.73196 1.0856Z" fill="#D9322A" transform="translate(27,18)"/>
            <path d="M3.12195 0.621948L0.682922 3.06097L3.12195 5.5L5.56097 3.06097L3.12195 0.621948Z" fill="#D9322A" transform="translate(31,18)"/>
            
            <path d="M3 0.0121918L0.560974 2.45122L3 4.89024L5.43902 2.45122L3 0.0121918Z" fill="#D9322A" transform="translate(0,22)"/>
            <path d="M2.3905 1.47585L1.41489 2.45146L2.3905 3.42706L3.36611 2.45145L2.3905 1.47585Z" fill="#D9322A" transform="translate(0,22)"/>
            <path d="M2.73196 1.47585L1.75635 2.45146L2.73196 3.42706L3.70757 2.45145L2.73196 1.47585Z" fill="#D9322A" transform="translate(27,22)"/>
            <path d="M3.12195 0.0121918L0.682922 2.45122L3.12195 4.89024L5.56097 2.45122L3.12195 0.0121918Z" fill="#D9322A" transform="translate(31,22)"/>
            
            <path d="M3 0.402435L0.560974 2.84146L3 5.28048L5.43902 2.84146L3 0.402435Z" fill="#D9322A" transform="translate(0,26)"/>
            <path d="M2.3905 1.86609L1.41489 2.8417L2.3905 3.81731L3.36611 2.8417L2.3905 1.86609Z" fill="#D9322A" transform="translate(0,26)"/>
            <path d="M2.73196 1.86609L1.75635 2.8417L2.73196 3.81731L3.70757 2.8417L2.73196 1.86609Z" fill="#D9322A" transform="translate(27,26)"/>
            <path d="M3.12195 0.402435L0.682922 2.84146L3.12195 5.28048L5.56097 2.84146L3.12195 0.402435Z" fill="#D9322A" transform="translate(31,26)"/>
            
            <path d="M3.39026 0.792679L0.951233 3.2317L3.39026 5.67073L5.82928 3.2317L3.39026 0.792679Z" fill="#D9322A" transform="translate(0,31)"/>
            <path d="M2.78072 1.25633L1.80511 2.23194L2.78072 3.20755L3.75633 2.23194L2.78072 1.25633Z" fill="#D9322A" transform="translate(5,31)"/>
            <path d="M2.17098 1.25633L1.19537 2.23194L2.17098 3.20755L3.14659 2.23194L2.17098 1.25633Z" fill="#D9322A" transform="translate(9,31)"/>
            <path d="M2.56121 1.25633L1.5856 2.23194L2.56121 3.20755L3.53682 2.23194L2.56121 1.25633Z" fill="#D9322A" transform="translate(14,31)"/>
            <path d="M2.95147 1.25633L1.97586 2.23194L2.95147 3.20755L3.92708 2.23194L2.95147 1.25633Z" fill="#D9322A" transform="translate(18,31)"/>
            <path d="M2.3417 1.25633L1.36609 2.23194L2.3417 3.20755L3.31731 2.23194L2.3417 1.25633Z" fill="#D9322A" transform="translate(22,31)"/>
            <path d="M2.73172 0.792679L0.292694 3.2317L2.73172 5.67073L5.17074 3.2317L2.73172 0.792679Z" fill="#D9322A" transform="translate(27,31)"/>
            
            <path d="M2.78048 0.182922L0.341461 2.62195L2.78049 5.06097L5.21951 2.62195L2.78048 0.182922Z" fill="#D9322A" transform="translate(5,35)"/>
            <path d="M3.17074 0.182922L0.73172 2.62195L3.17074 5.06097L5.60977 2.62195L3.17074 0.182922Z" fill="#D9322A" transform="translate(9,35)"/>
            <path d="M2.56097 0.182922L0.121948 2.62195L2.56097 5.06097L5 2.62195L2.56097 0.182922Z" fill="#D9322A" transform="translate(14,35)"/>
            <path d="M2.95123 0.182922L0.512207 2.62195L2.95123 5.06097L5.39026 2.62195L2.95123 0.182922Z" fill="#D9322A" transform="translate(18,35)"/>
            <path d="M3.34146 0.182922L0.902435 2.62195L3.34146 5.06097L5.78048 2.62195L3.34146 0.182922Z" fill="#D9322A" transform="translate(22,35)"/>
          </>
        )}
      </svg>
    </div>
  )
}

const CloseIcon: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button 
    className="snackbar__close-button"
    onClick={onClick}
    aria-label="Close notification"
    type="button"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M11.9993 11.086L16.9493 6.13599L18.3633 7.54999L13.4133 12.5L18.3633 17.45L16.9493 18.864L11.9993 13.914L7.04925 18.864L5.63525 17.45L10.5853 12.5L5.63525 7.54999L7.04925 6.13599L11.9993 11.086Z" 
        fill="currentColor"
      />
    </svg>
  </button>
)

const Snackbar: React.FC<SnackbarProps> = ({
  variant,
  title,
  message,
  onClose
}) => {
  return (
    <div className={`snackbar snackbar--${variant}`} role="alert" aria-live="polite">
      <div className="snackbar__content">
        <div className="snackbar__icon-text">
          <SnackbarIcon variant={variant} />
          <div className="snackbar__text">
            <div className="snackbar__title">{title}</div>
            <div className="snackbar__message">{message}</div>
          </div>
        </div>
        {onClose && <CloseIcon onClick={onClose} />}
      </div>
    </div>
  )
}

export default Snackbar
