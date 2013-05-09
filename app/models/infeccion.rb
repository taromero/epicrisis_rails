class Infeccion < ActiveRecord::Base
	attr_accessible :nombre, :antibiotico_usado, :shock_septico, :curacion
	belongs_to :epicrisis
end