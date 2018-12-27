import { h } from 'preact';
import DonateOrNotDonate from './DonateOrNotDonate';
import TermsOfServiceAcceptance from './TermsOfServiceAcceptance';
import ContactButton from './ContactButton';
import EmailRequestField from './EmailRequestField';
import { calculateTimeToRender } from '../extras/auxiliar';

const RequestDownloadPage = ({
  donate,
  status,
  openingKey,
  finishRequestHandle,
  ...props
}) => {
  const { queueSize } = status;
  const timeToRender = calculateTimeToRender(queueSize);

  const iframe = document.querySelector('#paypalDonateIframe');

  const donateScreen = (
    <div>
      <p>
        Great choice! You can donate how much you want but there is a minimum to receive the video.
        <ul>
          <li>At least <b>7 US Dollars</b> for HD video (1280x720).</li>
          <li>At least <b>10 US Dollars</b> for Full HD video (1920x1080)</li>
          <li>At least <b>30 US Dollars</b> for more customizable video with
          the Death Star image replacement (Contact us via email to submit your image).
          </li>
        </ul>
        <b>Click</b> on the following PayPal button to donate:
      </p>
      <iframe
        title="PayPal Donation Buttons"
        src={`${iframe.src}#!/${openingKey}`}
        className={iframe.classList.toString()}
        height="33px"
      />
    </div>
  );

  const paypalEmail = donate ?
    'Please, use the same email from your PayPal account and if you don\'t receive our confirmation mail, please contact us.' :
    '';

  const youCanStillDonate = (
    <p>
      Your video request will be queued at position {queueSize + 1} of the queue.
      It may take up to {timeToRender} to have your video rendered.
      You can still donate to get it earlier if you want.
      <p>
        <DonateOrNotDonate {...props} hideNoDonateOption />
      </p>
    </p>
  );

  return (
    <div className="requestDownloadPage">
      {donate && donateScreen}
      {!donate && youCanStillDonate}
      <p>
        Fill your email below and when your video is ready
        you will receive a message with the link to download it.
        We promise not to send spam!&nbsp;
        {paypalEmail}
      </p>
      <TermsOfServiceAcceptance />
      <ContactButton />
      <EmailRequestField
        openingKey={openingKey}
        finishRequestHandle={finishRequestHandle}
      />
    </div>
  );
};

export default RequestDownloadPage;
