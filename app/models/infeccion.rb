class Infeccion < ActiveRecord::Base
	attr_accessible :nombre, :antibioticoUsado, :shockSeptico, :curacion
	belongs_to :epicrisis
end