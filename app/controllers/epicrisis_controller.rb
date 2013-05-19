class EpicrisisController < ApplicationController

	def show
		binding.pry
		render json: Epicrisis.find(params[:id])
	end

end