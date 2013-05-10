class Infeccion < ActiveRecord::Base
	attr_accessible :nombre, :antibiotico_usado, :shock_septico, :curacion
	has_many :cultivos
	belongs_to :epicrisis
end