class VotesController < ApplicationController
    def create
        if request.headers['Captcha-Token']
            token_verification_response = verify_captcha()
        else
            token_verification_response = "rcaptcha unauthorized"
        end
        vote = Vote.new(vote_params)
        if token_verification_response["success"] && vote.save!
            render json: {message: 'vote successfully completed', status: 200}, status: :ok
        else
            render json: {message: 'the USPS has misplaced your vote :/', status: 400}, status: 400
        end
    end
    def index
        votes = Vote.all()
        render json: {votes: votes}, status: :ok
    end
    private
        def vote_params
            params.require(:vote).permit(:choice)
        end
end
