class EpicrisisController < ApplicationController

	def show
		render json: Epicrisis.find(params[:id])
	end

end