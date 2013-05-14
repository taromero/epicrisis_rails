class InfeccionSerializer < ActiveModel::Serializer
  attributes :id, :nombre, :antibiotico_usado, :shock_septico, :curacion
  has_one :ascitis
  has_one :hemocultivos
  has_one :urocultivo
  has_many :cultivos
end
