FactoryGirl.define do

  factory :infeccion do
    sequence(:nombre) {|n| (0...8).map{ ('a'..'z').to_a[rand(26)] }.join }
    sequence(:antibiotico_usado) {|n| (0...8).map{ ('a'..'z').to_a[rand(26)] }.join }
    shock_septico false
    curacion true
  end

  factory :epicrisis do

  	trait :inf do
  		infeccion
  	end
  end

end