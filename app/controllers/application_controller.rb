class ApplicationController < ActionController::Base
    def verify_captcha
        captcha_token = request.headers['Captcha-Token']
        secret = ENV["RCAPTCHA_SECRET_KEY"]
        url = "https://www.google.com/recaptcha/api/siteverify?secret="+secret+"&response="+captcha_token
        captcha_result = HTTParty.post(url)
        if captcha_result
            captcha_result
        else
           "captcha invalid"
        end
        #puts json: {message: 'captcha verified', rel_token: token, status: 200}
    end
end
