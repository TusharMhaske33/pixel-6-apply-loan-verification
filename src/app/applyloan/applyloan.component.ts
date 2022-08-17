import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseState } from 'src/app/core/common.response.model';
import { ValidationConstants } from 'src/app/core/validation.constants';
import { ApplyloanService } from './applyloan.service';

@Component({
  selector: 'app-applyloan',
  templateUrl: './applyloan.component.html',
  styleUrls: ['./applyloan.component.scss']
})
export class ApplyloanComponent implements OnInit {

  public registerFrm: FormGroup;

  public pageModel = {
    isFormSubmited: false,
    isOtpSubmited: false,
    isOtpTimeOut: false,
    isVerificationSuccess: false,
    isOtpSendSuccess: false,
    otpElapsedTime: null,
    otpTimer: 180,// in second
    otpSentTimes: 0 // how many times otp send - 
  }

  constructor(private fb: FormBuilder,
    private register: ApplyloanService
  ) { }

  ngOnInit() {
    /**
   * registration form init
   */
    this.registerFrm = this.fb.group({
      city: ['', [Validators.required]],
      panNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(ValidationConstants.PAN_REGX)]],
      fullname: ['', [Validators.required, Validators.maxLength(140)]],
      email: ['', [Validators.required, , Validators.maxLength(255), Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(ValidationConstants.NUMBER_ONLY), Validators.maxLength(10)]],
      otp: ['', [Validators.required, Validators.pattern(ValidationConstants.NUMBER_ONLY), Validators.maxLength(4), Validators.minLength(4)]]
    });

  }


  /**
 * getter for registration form controls
 */
  get regFrm() {
    return this.registerFrm.controls
  }


  // The function used to reset the form with all fields and errors 
  resetForm() {
    this.registerFrm.reset();
    this.pageModel.isFormSubmited = false
    this.pageModel.isOtpSendSuccess = false
    this.pageModel.isOtpSubmited = false
    this.pageModel.isVerificationSuccess = false
  }

  onChangeMobile() {
    if (this.pageModel.otpSentTimes <= 3) {

      this.pageModel.isOtpSendSuccess = false;
      this.pageModel.isFormSubmited = true
      if (this.regFrm.fullname.invalid ||
        this.regFrm.panNumber.invalid ||
        this.regFrm.city.invalid ||
        this.regFrm.mobile.invalid ||
        this.regFrm.email.invalid)
        return false;

      this.regFrm.mobile.setValue(parseInt(this.regFrm.mobile.value));

      this.register.post('https://jocata.thinkoverit.com/api/getOTP.php', this.registerFrm.value).subscribe((respData: ResponseState) => {
        if (respData.status == 'Success') {
          this.pageModel.otpSentTimes++;
          this.resetOtpTimer(this.pageModel.otpTimer);
          alert("OTP send success, Please verify OTP");
          this.pageModel.isOtpSendSuccess = true;
        } else {
          alert("Failed to send otp");
          this.pageModel.isOtpSendSuccess = false;
        }
      }, (error) => {
        alert("Failed to send otp");
        this.pageModel.isOtpSendSuccess = false;
      })

    } else {
      alert("Please try after an hour, You cross limit to send OTP");
      this.resetForm();
    }
  }

  /**
   * 
   * This function verifies the otp that entered by user
   * If otp is correct redirect to the users page 
   */
  verifyOtp() {
    this.pageModel.isOtpSubmited = true;
    this.pageModel.isVerificationSuccess = false;
    if (this.regFrm.otp.invalid)
      return false

    const reqObj = { "mobile": this.regFrm.mobile.value, "otp": this.regFrm.otp.value };
    this.register.post('https://jocata.thinkoverit.com/api/verifyOTP.php', reqObj).subscribe((resp: ResponseState) => {
      if (resp.status == 'Success') {
        alert("OTP verified success");
        this.pageModel.isVerificationSuccess = true;
      } else {
        alert("You have entered invalid OTP");
      }
    }, (err) => {
      alert("Failed to verify otp");
    })

  }


  resetOtpTimer(remaining) {
    let timerOn = true;
    var m: string | number = Math.floor(remaining / 60);
    var s: string | number = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    // document.getElementById('timer').innerHTML = m + ':' + s;

    this.pageModel.otpElapsedTime = m + ':' + s
    remaining -= 1;

    if (remaining >= 0 && timerOn) {
      setTimeout(() => {
        this.resetOtpTimer(remaining);
      }, 1000);
      return;
    }

    if (!timerOn) {
      // Do validate stuff here
      return;
    }

    // timeout stuff here
    this.pageModel.otpElapsedTime = null
  }


  sendOtp() {
    this.onChangeMobile();
    this.pageModel.otpElapsedTime = null
    this.resetOtpTimer(this.pageModel.otpTimer)
  }

}

